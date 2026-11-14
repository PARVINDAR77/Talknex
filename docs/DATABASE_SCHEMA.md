# DATABASE_SCHEMA.md — TalkNex PostgreSQL Database Schema

## 1. Relational Entities Summary

The database architecture is designed with strict normalization, relational integrity, timestamping, indexing, and publication state machines.

### Core Tables

1. **`users`**:
   - `id`: UUID (PK)
   - `email`: VARCHAR(255) UNIQUE
   - `name`: VARCHAR(255)
   - `role`: ENUM (`SUPER_ADMIN`, `ADMIN`, `EDITOR`, `VIEWER`)
   - `created_at`: TIMESTAMPTZ, `updated_at`: TIMESTAMPTZ

2. **`website_pages`**:
   - `id`: UUID (PK)
   - `slug`: VARCHAR(255) UNIQUE (Indexed)
   - `title`: VARCHAR(255)
   - `description`: TEXT
   - `meta_title`: VARCHAR(255)
   - `meta_description`: TEXT
   - `status`: ENUM (`DRAFT`, `PUBLISHED`, `ARCHIVED`)
   - `published_at`: TIMESTAMPTZ

3. **`page_sections`**:
   - `id`: UUID (PK)
   - `page_id`: UUID (FK -> website_pages.id)
   - `section_key`: VARCHAR(100) (e.g. `hero`, `capabilities`, `pricing_preview`)
   - `heading`: VARCHAR(255)
   - `subheading`: TEXT
   - `content`: JSONB
   - `order_index`: INT
   - `is_active`: BOOLEAN DEFAULT true

4. **`navigation_items`**:
   - `id`: UUID (PK)
   - `label`: VARCHAR(100)
   - `href`: VARCHAR(255)
   - `parent_id`: UUID NULL (FK -> navigation_items.id)
   - `order_index`: INT
   - `menu_location`: ENUM (`HEADER`, `FOOTER_PRODUCT`, `FOOTER_USE_CASES`, `FOOTER_RESOURCES`, `FOOTER_COMPANY`)
   - `is_active`: BOOLEAN DEFAULT true

5. **`pricing_plans`**:
   - `id`: UUID (PK)
   - `slug`: VARCHAR(100) UNIQUE (e.g. `starter`, `growth`, `business`, `enterprise`)
   - `name`: VARCHAR(100)
   - `tagline`: VARCHAR(255)
   - `monthly_price_inr`: INT
   - `yearly_price_inr`: INT (Annual billing with 20% savings)
   - `call_minutes_included`: INT
   - `voice_agents_limit`: INT
   - `is_popular`: BOOLEAN DEFAULT false
   - `cta_text`: VARCHAR(100)
   - `cta_href`: VARCHAR(255)
   - `display_order`: INT
   - `is_active`: BOOLEAN DEFAULT true

6. **`pricing_features`**:
   - `id`: UUID (PK)
   - `category`: VARCHAR(100) (e.g. `Voice & Calling`, `Campaigns`, `Integrations`, `Support`)
   - `name`: VARCHAR(255)
   - `description`: TEXT
   - `order_index`: INT

7. **`plan_feature_assignments`**:
   - `id`: UUID (PK)
   - `plan_id`: UUID (FK -> pricing_plans.id)
   - `feature_id`: UUID (FK -> pricing_features.id)
   - `is_included`: BOOLEAN
   - `value_text`: VARCHAR(255) NULL (e.g. "Up to 5 Agents", "Dedicated Server")

8. **`blog_categories`**:
   - `id`: UUID (PK)
   - `name`: VARCHAR(100)
   - `slug`: VARCHAR(100) UNIQUE
   - `description`: TEXT

9. **`authors`**:
   - `id`: UUID (PK)
   - `name`: VARCHAR(100)
   - `slug`: VARCHAR(100) UNIQUE
   - `title`: VARCHAR(150)
   - `bio`: TEXT
   - `avatar_url`: VARCHAR(255)

10. **`blog_posts`**:
    - `id`: UUID (PK)
    - `slug`: VARCHAR(255) UNIQUE (Indexed)
    - `title`: VARCHAR(255)
    - `excerpt`: TEXT
    - `content`: TEXT
    - `cover_image_url`: VARCHAR(255)
    - `reading_time_minutes`: INT
    - `author_id`: UUID (FK -> authors.id)
    - `category_id`: UUID (FK -> blog_categories.id)
    - `status`: ENUM (`DRAFT`, `PUBLISHED`, `ARCHIVED`)
    - `published_at`: TIMESTAMPTZ

11. **`use_cases`**:
    - `id`: UUID (PK)
    - `slug`: VARCHAR(100) UNIQUE
    - `title`: VARCHAR(150)
    - `industry`: VARCHAR(100)
    - `summary`: TEXT
    - `problem_statement`: TEXT
    - `solution_overview`: TEXT
    - `sample_dialogue`: JSONB (Speaker turns in Hindi/English)
    - `benefits`: JSONB
    - `order_index`: INT
    - `is_active`: BOOLEAN DEFAULT true

12. **`integrations`**:
    - `id`: UUID (PK)
    - `slug`: VARCHAR(100) UNIQUE
    - `name`: VARCHAR(100)
    - `category`: VARCHAR(100) (CRM, Calendars, Ads, E-commerce, Webhooks)
    - `description`: TEXT
    - `status`: ENUM (`AVAILABLE`, `BETA`, `PLANNED`)
    - `logo_url`: VARCHAR(255)
    - `order_index`: INT

13. **`faqs`**:
    - `id`: UUID (PK)
    - `question`: VARCHAR(255)
    - `answer`: TEXT
    - `category`: VARCHAR(100) (e.g. `General`, `Technical`, `Compliance`, `Billing`)
    - `order_index`: INT
    - `is_featured`: BOOLEAN DEFAULT false

14. **`contact_enquiries`**:
    - `id`: UUID (PK)
    - `name`: VARCHAR(150)
    - `email`: VARCHAR(255) (Indexed)
    - `phone`: VARCHAR(50)
    - `company`: VARCHAR(150)
    - `industry`: VARCHAR(100)
    - `message`: TEXT
    - `source_page`: VARCHAR(255)
    - `utm_params`: JSONB
    - `status`: ENUM (`NEW`, `IN_REVIEW`, `CONTACTED`, `QUALIFIED`, `CLOSED`)
    - `ip_address`: VARCHAR(45)
    - `created_at`: TIMESTAMPTZ

15. **`demo_bookings`**:
    - `id`: UUID (PK)
    - `name`: VARCHAR(150)
    - `email`: VARCHAR(255) (Indexed)
    - `phone`: VARCHAR(50)
    - `company`: VARCHAR(150)
    - `industry`: VARCHAR(100)
    - `preferred_date`: DATE
    - `preferred_time`: VARCHAR(50)
    - `time_zone`: VARCHAR(50) DEFAULT 'Asia/Kolkata'
    - `requirements`: TEXT
    - `status`: ENUM (`CONFIRMED`, `RESCHEDULED`, `COMPLETED`, `CANCELLED`)
    - `created_at`: TIMESTAMPTZ

16. **`newsletter_subscribers`**:
    - `id`: UUID (PK)
    - `email`: VARCHAR(255) UNIQUE (Indexed)
    - `is_active`: BOOLEAN DEFAULT true
    - `subscribed_at`: TIMESTAMPTZ DEFAULT NOW()
    - `unsubscribed_at`: TIMESTAMPTZ NULL

17. **`audit_logs`**:
    - `id`: UUID (PK)
    - `action`: VARCHAR(100)
    - `entity_type`: VARCHAR(100)
    - `entity_id`: VARCHAR(100)
    - `payload`: JSONB
    - `created_at`: TIMESTAMPTZ DEFAULT NOW()

