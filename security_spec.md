# Security Specification for Moinul Islam Portfolio

## Data Invariants
1. **Messages**: must have a valid name, email, and message.
2. **Portfolio**: must have a title, category, and imageUrl.
3. **Skills/Education**: must have required fields.
4. **Admin**: Only authorized users can modify the content.

## The Dirty Dozen Payloads

1. **Identity Spoofing**: Attempting to set `senderId` in a message to another user.
2. **Shadow Field**: Adding `isVerified: true` to a message payload.
3. **Ghost Collection**: Attempting to write to `/admins/` as a non-admin.
4. **Resource Poisoning**: Sending a 1MB string as a message body.
5. **ID Poisoning**: Using a 2KB string as a message ID.
6. **Bypassing Validation**: Sending a message without an email.
7. **Privilege Escalation**: Trying to update a portfolio item as a guest.
8. **Orphaned Record**: Creating a sub-document for a non-existent parent (if applicable).
9. **State Shortcut**: Changing a message status to 'read' as a guest.
10. **Array Explosion**: Sending a list with 1000 items in a field.
11. **PII Leak**: Attempting to read all messages as an unauthenticated user.
12. **Timestamp Spoofing**: Providing a `createdAt` in the past.

## Test Strategy
All tests should return `PERMISSION_DENIED` for the above payloads.
