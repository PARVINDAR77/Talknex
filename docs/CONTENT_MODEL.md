# CONTENT_MODEL.md — TalkNex Editorial & CMS Content Model

## 1. Editorial Separation of Concerns

To prepare the platform for future Super Admin management without requiring hardcoded changes in code, all dynamic marketing copy is mapped to structured database entities.

### Schema Entity Model

1. **`WebsitePage`**:
   - `slug`: Unique identifier matching frontend routing.
   - `title`: Internal and display page title.
   - `metaTitle`: Search engine headline.
   - `metaDescription`: 155-character summary for SERPs.
   - `status`: Published or Draft.

2. **`PageSection`**:
   - `sectionKey`: Standardized component identifier (e.g., `hero`, `capabilities`, `how_it_works`, `testimonials`).
   - `heading`: Section title.
   - `subheading`: Section context.
   - `content`: JSONB payload containing custom badges, card arrays, step definitions, and interactive state triggers.

3. **`BlogPost`**:
   - `slug`: URL slug.
   - `title`: Post title.
   - `excerpt`: Card summary.
   - `content`: Full markdown or rich text article body.
   - `coverImageUrl`: Asset reference.
   - `readingTimeMinutes`: Calculated reading time.
   - `author`: Relational foreign key to `Author`.
   - `category`: Relational foreign key to `BlogCategory`.
   - `status`: Published state flag.

4. **`PricingPlan` & `PricingFeature`**:
   - Explicit database-level configuration of monthly, annual, credit, and limits parameters.
   - Boolean and custom value assignments for cross-comparison matrices.

