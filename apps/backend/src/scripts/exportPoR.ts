import { InvariantEngine } from '../modules/reconciliation/invariantEngine';
import { PorSanitizer } from '../modules/por/porSanitizer';
import { PorPublisher } from '../modules/por/porPublisher';
import { logger } from '../utils/logger';

async function main() {
  console.log('================================================================');
  console.log('UNYKORN GOLD RAILS — ON-DEMAND PROOF-OF-RESERVE AUDIT EXPORT');
  console.log('================================================================\n');

  try {
    // 1. Evaluate reserve invariant
    console.log('🔍 [1/3] Querying Depository & XRPL Gateway Balances...');
    const evalResult = await InvariantEngine.evaluateInvariant();

    console.log(`\n📊 Invariant Verification Status: ${evalResult.isPassed ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`   - Verified Depository Fine Gold: ${evalResult.vaultFineMg} mg`);
    console.log(`   - XRPL Circulating Obligations:  ${evalResult.circulatingMg} mg`);
    console.log(`   - Pending Unminted Intents:      ${evalResult.pendingMintsMg} mg`);
    console.log(`   - Pending Physical Burns:        ${evalResult.pendingBurnsMg} mg`);
    console.log(`   - Net Reserve Surplus:           ${evalResult.deltaSurplusMg} mg`);
    console.log(`   - Attestation Signature:         ${evalResult.attestationSigHex.slice(0, 32)}...`);

    // 2. Generate sanitized PoR payload
    console.log('\n🔒 [2/3] Generating HMAC-Masked Proof-of-Reserve JSON...');
    const porPayload = await PorSanitizer.generateSanitizedPoR(evalResult);

    // 3. Publish to S3 / Cloudflare R2 / Local Cache
    console.log('🌐 [3/3] Publishing Proof-of-Reserve Report...');
    const published = await PorPublisher.publishPoR(porPayload);

    console.log('\n✨ Export & Publication Complete!');
    console.log(`   - Report URL: ${published.publicUrl}`);
    console.log(`   - Timestamp:  ${published.publishedAt}`);
    console.log('\nPreview Payload:');
    console.log(JSON.stringify(porPayload, null, 2));

    process.exit(0);
  } catch (error) {
    logger.error({ error }, 'Failed to export Proof-of-Reserve report');
    console.error('❌ Error executing PoR export:', error);
    process.exit(1);
  }
}

main();
