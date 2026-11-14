# BACKUP_AND_RECOVERY.md — Database Backup & Disaster Recovery Runbook

## 1. Automated Backup Cadence
- **Continuous WAL Archiving**: Point-In-Time-Recovery (PITR) enabled.
- **Daily Snapshots**: Automated `pg_dump` with gzip compression at 02:00 UTC.
- **Off-Site Retention**: Encrypted uploads to S3-compatible cloud storage with 30-day retention policies.

## 2. Restoration Verification Procedure
1. Create isolated verification database instance.
2. Restore snapshot using `pg_restore --clean --if-exists -d talknex_verify dump.sql.gz`.
3. Verify row counts and integrity on `website_pages`, `pricing_plans`, `contact_enquiries`, and `demo_bookings`.
4. Automated restoration drill executed quarterly.

