import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '../../config/env';
import { logger } from '../../utils/logger';
import { SanitizedProofOfReservePayload } from './porSanitizer';

export class PorPublisher {
  private static cachedLatestPor: SanitizedProofOfReservePayload | null = null;

  /**
   * Publishes the PoR payload to S3 / Cloudflare R2 bucket and updates memory cache.
   */
  public static async publishPoR(payload: SanitizedProofOfReservePayload): Promise<{
    publicUrl: string;
    publishedAt: string;
  }> {
    this.cachedLatestPor = payload;
    const jsonString = JSON.stringify(payload, null, 2);

    if (env.S3_ACCESS_KEY_ID && env.S3_SECRET_ACCESS_KEY && env.S3_ENDPOINT) {
      try {
        const s3Client = new S3Client({
          region: 'auto',
          endpoint: env.S3_ENDPOINT,
          credentials: {
            accessKeyId: env.S3_ACCESS_KEY_ID,
            secretAccessKey: env.S3_SECRET_ACCESS_KEY,
          },
        });

        const command = new PutObjectCommand({
          Bucket: env.S3_BUCKET_NAME,
          Key: 'proof-of-reserves-latest.json',
          Body: jsonString,
          ContentType: 'application/json',
          CacheControl: 'public, max-age=60, s-maxage=60',
        });

        await s3Client.send(command);
        logger.info({ bucket: env.S3_BUCKET_NAME }, 'Published PoR JSON to Cloudflare R2 / S3');
      } catch (err) {
        logger.error({ err }, 'Failed to upload PoR to S3/R2. Falling back to local memory cache.');
      }
    } else {
      logger.info('S3 credentials not fully configured; serving latest PoR from in-memory cache.');
    }

    return {
      publicUrl: `${env.S3_PUBLIC_BASE_URL}/proof-of-reserves-latest.json`,
      publishedAt: payload.timestamp,
    };
  }

  /**
   * Retrieves latest cached PoR payload.
   */
  public static getLatestCachedPoR(): SanitizedProofOfReservePayload | null {
    return this.cachedLatestPor;
  }
}
