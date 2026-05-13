# Events Reference

This document describes how event data is expected to work across the public homepage and the admin dashboard.

## Firestore Event Shape

Each event document in the `events` collection is expected to include:

- `id`: stable event identifier used to pair metadata with a Storage image
- `title`: public event name
- `date`: event date in `YYYY-MM-DD`
- `time`: event time in `HH:MM`
- `link`: public event registration or landing-page URL
- `priority`: internal urgency label such as `Low`, `Medium`, or `High`
- `requestedBy`: internal team label such as `Events`, `Projects`, or `Partnerships`

Optional but supported fields:

- `image`: direct public image URL or a storage-like tag/path
- `storagePath`: explicit Firebase Storage path for the banner
- `createdAt`: creation timestamp in milliseconds
- `createdBy`: name of the person who created the event entry
- `lastUpdatedAt`: last update timestamp in milliseconds
- `lastUpdatedBy`: name of the person who last updated the event entry

## Storage Pairing Rules

The website tries to resolve the event banner image in this order:

1. Use `image` directly if it is already a full URL.
2. Use `storagePath` if present.
3. Derive the image path from `id` as `event-banners/<id>.webp`.
4. Fall back to other storage-like values if older event data used a tag/path in `image`.

This allows older and newer event documents to coexist while still rendering correctly.

## Homepage Event Logic

The public homepage should:

1. Load all documents from the Firestore `events` collection.
2. Resolve each banner image from Firebase Storage if needed.
3. Show only upcoming events where `eventDate >= now`.
4. Sort upcoming events by soonest date first.

If there are no valid upcoming events:

- show a clean fallback state instead of duplicating placeholder slides
- keep the section usable and include a clickable CTA such as `View Our Events`

If Firestore cannot be read:

- show an error-style fallback message
- still provide a clickable CTA so the section remains useful

## Admin Expectations

The admin dashboard should:

- create new events using the schema above
- convert uploaded banner images to WebP before upload
- preserve event-to-storage pairing on edit
- allow updating and deleting existing events
- require attribution fields for transparency when creating or editing events

## Notes

- Firebase web config values can live in environment variables, but Firestore and Storage access are still controlled by Firebase rules.
- The public homepage depends on Firestore reads being allowed for the `events` collection.
