# TO DO

## Landing Page

- [x] Initial landing page introducing the booking application with its name
- [ ] Display registration instructions and basic operation instructions

## Authentication & Registration

- [x] Only @mcgill.ca and @mail.mcgill.ca emails can register
- [x] Only registered users can create and reserve booking slots
- [ ] Logout functionality

## Owner Features (@mcgill.ca only)

### Slot Management

- [ ] Owner can create booking slots (start as private, visible only to owner)
- [ ] Owner can activate a slot (makes it public; allows users to reserve it)
- [ ] Owner can delete a booking slot
  - [ ] Send notification email (mailto:) to user who had reserved the deleted slot
- [ ] Owner can view all their slots and see who has booked each slot
- [ ] Owner can send email to the person who booked a slot (mailto:)

### Invitation

- [ ] Owner can generate an invitation URL (for use in slides or emails)
  - [ ] URL leads to a Booking Page showing only that owner's activated slots
  - [ ] Booking Page prompts user to log in

## User Features (@mcgill.ca and @mail.mcgill.ca)

### Browsing & Booking

- [ ] Listing page: browse all registered @mcgill.ca owners who have active slots
- [ ] Select an owner to view their available slots
- [ ] Book an available (active) slot
- [ ] View all personally booked slots

### Managing Bookings

- [ ] Delete a booking (slot becomes available again)
  - [ ] Send notification email (mailto:) to slot owner when booking is cancelled
- [ ] Message the owner of a booking slot (mailto:)

## Dashboard (Post-Login)

- [ ] Dashboard listing all user appointments
- [ ] Email (mailto:) the owner of a selected/open slot
- [ ] Delete appointments from dashboard
- [ ] Book additional appointments from dashboard
- [ ] Logout button

## Booking Types

### Type 1 — Request a Meeting

- [ ] User sends a meeting request message to an owner
- [ ] Owner receives notification email (mailto:)
- [ ] Request appears in owner's dashboard as a pending/unapproved request
- [ ] Owner can accept or decline the request
  - [ ] If accepted: create a new booking slot and send email to the user (mailto:)
  - [ ] Booking appears on both user's and owner's dashboards

### Type 2 — Group Meeting (Calendar Method)

- [ ] Owner picks specific dates/times they are available (start date to end date)
- [ ] Users can select from those defined dates/times (multiple selections allowed)
- [ ] System counts how many times each slot was selected
- [ ] Owner reviews counts and selects a final meeting time
- [ ] Owner can define the meeting as one-time or recurring (e.g., repeat for N consecutive weeks)
- [ ] On selection: send notification email to all participants (mailto:)
- [ ] Booking appears on all participants' and owner's dashboards

### Type 3 — Recurring Office Hours (Calendar Method, no invited users)

- [ ] Owner defines one or more weekly slots available for reservation
- [ ] Owner sets number of weeks the slots repeat (e.g., entire semester)
- [ ] Any registered user can reserve an available slot
- [ ] On reservation: send notification email to the owner (mailto:)
- [ ] Booking appears on both the user's and owner's dashboards
