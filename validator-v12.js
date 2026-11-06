// ClearCue AI V1.2
// AI Response Validator

const ALLOWED_PRIORITIES = [
  "High",
  "Medium",
  "Low"
];

const ALLOWED_CATEGORIES = [
  "Education",
  "Work",
  "Personal",
  "Finance",
  "Health",
  "Other"
];

export function validateAIResponse(data, originalMessage) {
  const errors = [];

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      valid: false,
      errors: ["Response must be a valid object."]
    };
  }

  // 1. Task description
  if (
    typeof data.task !== "string" ||
    !data.task.trim()
  ) {
    errors.push("Missing or invalid task description.");
  }

  // 2. Original source sentence
  if (
    typeof data.source !== "string" ||
    !data.source.trim()
  ) {
    errors.push("Missing original source sentence.");
  } else if (
    typeof originalMessage !== "string" ||
    !originalMessage.includes(data.source)
  ) {
    errors.push("Source sentence was not found in the original message.");
  }

  // 3. Deadline
  if (
    data.deadline !== null &&
    (
      typeof data.deadline !== "string" ||
      !data.deadline.trim()
    )
  ) {
    errors.push("Deadline must be a date phrase or null.");
  }

  // 4. Priority
  if (!ALLOWED_PRIORITIES.includes(data.priority)) {
    errors.push("Invalid priority level.");
  }

  // 5. Category
  if (!ALLOWED_CATEGORIES.includes(data.category)) {
    errors.push("Invalid task category.");
  }

  // 6. Uncertainty
  if (typeof data.uncertain !== "boolean") {
    errors.push("Uncertainty must be true or false.");
  }

  // 7. Explanation
  if (
    typeof data.explanation !== "string" ||
    !data.explanation.trim()
  ) {
    errors.push("Missing explanation.");
  }

  return {
    valid: errors.length === 0,
    errors,
    value: errors.length === 0 ? {
      task: data.task.trim(),
      source: data.source.trim(),
      deadline: data.deadline,
      priority: data.priority,
      category: data.category,
      uncertain: data.uncertain,
      explanation: data.explanation.trim()
    } : null
  };
}
