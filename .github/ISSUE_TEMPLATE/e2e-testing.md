---
name: E2E Testing
about: Describe this issue template's purpose here.
title: ''
labels: ''
assignees: ''

---

## End-to-End (E2E) Test Request: Component/Function

### Overview
**Component/Function Name:**  
<!-- Name of the component or function to be tested -->

## Who are you?
You are a senior test engineer. 

**Location/Path:**  
<!-- File path or directory in the repo -->

**Feature Description:**  
<!-- Briefly describe what this component/function does and its purpose in the application -->

---

### Test Objectives
- [ ] Validate core functionality and user flows
- [ ] Ensure cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Verify accessibility (a11y) standards
- [ ] Confirm correct error handling and edge cases

---

### Acceptance Criteria

- [ ] Functionality matches documented requirements  
- [ ] UI/UX consistency across supported browsers  
- [ ] All user interactions (clicks, forms, navigation) perform as expected  
- [ ] Accessibility checks pass (labels, keyboard navigation, screen reader support)  
- [ ] Responsive design (mobile, tablet, desktop)  
- [ ] No critical console errors/warnings

---

### Suggested Test Scenarios

| Scenario | Steps | Expected Result |
|----------|-------|----------------|
| 1. | <!-- Step-by-step instructions for scenario 1 --> | <!-- Expected outcome --> |
| 2. | <!-- Step-by-step instructions for scenario 2 --> | <!-- Expected outcome --> |
| 3. | <!-- Additional scenarios as needed --> | <!-- Expected outcome --> |

---

### Cross-Browser Matrix

| Browser         | Version | OS           | Status |
|-----------------|---------|--------------|--------|
| Chrome          | Latest  | Windows/macOS| [ ]    |
| Firefox         | Latest  | Windows/macOS| [ ]    |
| Safari          | Latest  | macOS        | [ ]    |
| Edge            | Latest  | Windows      | [ ]    |
| Mobile Browsers | Latest  | iOS/Android  | [ ]    |

---

### Test Data

- **Sample Inputs:**  
  <!-- List any sample data needed for testing -->

- **Mock Services/APIs:**  
  <!-- Note if stubs/mocks are required -->

---

### GitHub Instructions

- **Branch Naming:** `e2e/<component-name>`  
- **PR Requirements:** Link this issue, include screenshots or video of test runs, reference related docs  
- **Testing Framework:** [Cypress/Playwright/etc.]  
- **Test Location:** Place E2E tests in `/e2e/<component>` directory  
- **Reviewers:** Tag relevant team members for code review

---

### Additional Notes

<!-- Add any context, links to related issues/PRs, external documentation, or caveats -->

---

**Checklist Before Closing Issue**
- [ ] All acceptance criteria met
- [ ] All supported browsers tested
- [ ] Test results attached (screenshots, logs)
- [ ] PR merged & documentation updated
