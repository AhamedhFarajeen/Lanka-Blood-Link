# Dashboard Summary API Contract

## Purpose and scope

This document defines the version 1 data contract between the Lanka Blood Link dashboard and the backend. The dashboard UI must obtain all summary data from one endpoint and must not reconstruct medical eligibility or matching decisions in the browser.

All field names and enum values are case-sensitive. Unless a future API version explicitly changes this contract, the backend must return every required field even when its value is zero, an empty string is not valid, or a collection is empty.

## Endpoint

### `GET /api/dashboard/summary`

Returns the current dashboard summary for an authenticated user who is authorized to view operational dashboard data.

- Method: `GET`
- Response content type: `application/json`
- Request body: none
- Query parameters: none in version 1
- Successful response: `200 OK`
- Empty-state behavior: return `0` for counts and `[]` for collections; do not return `null` or omit fields
- Authentication and authorization errors: use the application's shared `401 Unauthorized` and `403 Forbidden` behavior
- Other errors: use the application's shared API error contract; do not return a partial dashboard payload as though it were successful

The four sections should represent a reasonably consistent snapshot. In particular, `stats.eligibleDonors` and the sum of `donorAvailability[].count` must be calculated from the same matching-system eligibility result set.

## Successful response

```json
{
  "stats": {
    "registeredDonors": 0,
    "eligibleDonors": 0,
    "activeRequests": 0,
    "notificationsSent": 0
  },
  "urgentRequests": [
    {
      "id": "request-id",
      "bloodType": "O-",
      "units": 2,
      "district": "Kandy",
      "hospital": "National Hospital Kandy",
      "urgency": "CRITICAL",
      "status": "ACTIVE",
      "createdAt": "2026-09-04T08:30:00.000Z"
    }
  ],
  "donorAvailability": [
    {
      "bloodType": "A+",
      "count": 0
    }
  ],
  "recentMatches": [
    {
      "id": "match-id",
      "requestId": "request-id",
      "bloodType": "O-",
      "district": "Kandy",
      "score": 90,
      "notificationStatus": "NOTIFIED",
      "updatedAt": "2026-09-04T08:45:00.000Z"
    }
  ]
}
```

## Ownership and field definitions

### Top-level sections

| Field | Type | Required | Owning feature | Definition |
| --- | --- | --- | --- | --- |
| `stats` | object | Yes | Dashboard aggregation | Counts assembled from the donor, blood-request, matching, and notification features. |
| `urgentRequests` | array | Yes | Blood-request feature | Active requests classified as urgent for dashboard display. Return `[]` when none exist. |
| `donorAvailability` | array | Yes | Matching/eligibility feature | Aggregated counts from the matching system's current eligible-donor result set, grouped by blood type. Return `[]` when no groups exist. |
| `recentMatches` | array | Yes | Matching feature | Recently created or updated match summaries safe for operational display. Return `[]` when none exist. |

The dashboard endpoint is an aggregator, not the system of record. Each feature remains responsible for the meaning and correctness of the values it owns.

### `stats`

| Field | Type | Required | Owning feature | Definition |
| --- | --- | --- | --- | --- |
| `registeredDonors` | non-negative integer | Yes | Donor feature | Total registered donor records according to the donor feature's registration rules. |
| `eligibleDonors` | non-negative integer | Yes | Matching/eligibility feature | Number of donors currently marked eligible by the matching system. The dashboard and dashboard aggregator must not calculate medical eligibility. |
| `activeRequests` | non-negative integer | Yes | Blood-request feature | Total requests whose request status is `ACTIVE`. |
| `notificationsSent` | non-negative integer | Yes | Matching/notification feature | Total successfully sent match notifications under the product's agreed reporting window. The backend must use the same reporting-window rule consistently; the frontend must not infer this count from `recentMatches`. |

The reporting window for `notificationsSent` must be agreed before implementation (for example, all-time or current day). Until then, clients must treat it only as the number supplied by the backend.

### `urgentRequests[]`

| Field | Type | Required | Owning feature | Definition |
| --- | --- | --- | --- | --- |
| `id` | non-empty string | Yes | Blood-request feature | Stable public identifier for the request. |
| `bloodType` | blood-type enum | Yes | Blood-request feature | Blood type requested. |
| `units` | integer, minimum `1` | Yes | Blood-request feature | Number of blood units requested. |
| `district` | non-empty string | Yes | Blood-request feature | District in which fulfillment is needed. |
| `hospital` | non-empty string | Yes | Blood-request feature | Hospital or approved care-facility display name. |
| `urgency` | urgency enum | Yes | Blood-request feature | Operational urgency assigned to the request. |
| `status` | request-status enum | Yes | Blood-request feature | Request lifecycle status. This collection contains only active requests. |
| `createdAt` | ISO 8601 UTC date-time string | Yes | Blood-request feature | Time the request was created. Example: `2026-09-04T08:30:00.000Z`. |

`urgentRequests` must contain only requests with `status: "ACTIVE"` and `urgency` of `CRITICAL` or `HIGH`. Recommended ordering is `CRITICAL` before `HIGH`, then oldest `createdAt` first within the same urgency so the most time-sensitive waiting requests are visible first.

### `donorAvailability[]`

| Field | Type | Required | Owning feature | Definition |
| --- | --- | --- | --- | --- |
| `bloodType` | blood-type enum | Yes | Matching/eligibility feature | Blood-type group represented by the count. |
| `count` | non-negative integer | Yes | Matching/eligibility feature | Current number of eligible donors in the group, based on matching-system results. |

Each blood type may appear at most once. The array may include zero-count groups when the product wants a stable eight-row display, or omit zero-count groups; the frontend must support both. Regardless of representation, the sum of all returned `count` values must equal `stats.eligibleDonors`. If the endpoint omits zero-count groups, a missing group means zero availability, not unknown availability.

### `recentMatches[]`

| Field | Type | Required | Owning feature | Definition |
| --- | --- | --- | --- | --- |
| `id` | non-empty string | Yes | Matching feature | Stable public identifier for the match record. |
| `requestId` | non-empty string | Yes | Matching feature, referencing blood-request feature | Stable public identifier of the matched blood request. |
| `bloodType` | blood-type enum | Yes | Matching feature | Blood type used by the match result. This is request-level operational data, not a donor profile. |
| `district` | non-empty string | Yes | Matching feature | Operational district associated with the request/match. |
| `score` | integer from `0` through `100` | Yes | Matching feature | Matching-system score. The dashboard displays this value and must not recompute it. |
| `notificationStatus` | notification-status enum | Yes | Matching/notification feature | Current delivery state for the notification associated with the match. |
| `updatedAt` | ISO 8601 UTC date-time string | Yes | Matching feature | Time the match or its notification state was last updated. |

`recentMatches` should be ordered by `updatedAt` descending. The backend owns the result limit; clients must not assume that this array contains every match.

## Allowed enum values

### Blood type

`bloodType` must be one of:

- `A+`
- `A-`
- `B+`
- `B-`
- `AB+`
- `AB-`
- `O+`
- `O-`

### Urgency

The dashboard's `urgentRequests[].urgency` allows:

- `CRITICAL` — immediate, highest-priority response is required
- `HIGH` — urgent response is required, below critical priority

If the blood-request feature supports lower urgency values internally, the summary endpoint must filter them out rather than expose them in `urgentRequests`.

### Request status

The dashboard's `urgentRequests[].status` allows only:

- `ACTIVE` — the request is open and currently seeking fulfillment

The blood-request feature may have additional lifecycle statuses, but they are outside this endpoint's `urgentRequests` contract and must be filtered out.

### Notification status

`recentMatches[].notificationStatus` must be one of:

- `PENDING` — no successful notification has yet been recorded
- `NOTIFIED` — notification delivery/send was recorded as successful
- `FAILED` — the most recent notification attempt failed

Donor response, acceptance, fulfillment, and match lifecycle states are separate concepts and must not be encoded as `notificationStatus`.

## Required and optional fields

Every field shown in the successful response is required. Version 1 defines no optional response fields.

- Required objects must not be `null`.
- Required arrays must always be present and must use `[]` for an empty result.
- Required counts must always be present and must use `0` when the valid count is zero.
- Required strings must be non-empty; unknown values must be resolved by the owning feature rather than represented as `""` or `null`.
- Timestamps must be ISO 8601 strings normalized to UTC.
- Additional fields should not be added to this response without updating this contract, especially fields originating from donor records.

## Eligibility boundary

Medical eligibility is owned by the matching/eligibility system.

- `stats.eligibleDonors` must consume the matching system's current eligibility results.
- `donorAvailability[].count` must be derived from that same result set.
- `recentMatches[].score` must be supplied by the matching system.
- The dashboard frontend must not calculate, reinterpret, or override donor eligibility based on age, last donation date, health answers, medical history, or any other rule.
- The dashboard aggregation endpoint must not independently duplicate medical eligibility rules. It should consume an authoritative matching-system query or service result.

This boundary prevents the dashboard from drifting away from the medical and matching rules used elsewhere in the product.

## Privacy and data-minimization rules

This endpoint is an operational summary and must never return donor private data. In particular, it must not return:

- donor phone numbers, email addresses, home addresses, or other contact details;
- donor names, government identifiers, dates of birth, or direct donor identifiers;
- medical history, health-screening answers, eligibility reasons, deferral reasons, last-donation details, diagnoses, or other medical information;
- free-text notes that could contain personal or medical data;
- patient identity or patient medical details.

Only the fields explicitly listed in this contract are permitted. Matching records must be projected into the safe summary shape before serialization; donor documents or populated donor relations must never be serialized directly. Logs, tracing, caching, and error responses for this endpoint must follow the same privacy boundary.

## Integration notes requiring source alignment

The source repository was not present in the assigned workspace when this contract was authored, so current model enums, route middleware, error-envelope conventions, ID serialization, API base-path configuration, and list limits could not be verified. Before implementing the endpoint or dashboard UI, the team must reconcile this contract with the existing `Donor`, `BloodRequest`, and `Match` models and with the donor, request, matching, and notification services. Any disagreement should be resolved in the owning feature or through an explicit contract revision; the dashboard must not silently translate private data or recalculate eligibility.
