// Saare questions yahin se edit kar sakte ho.
// required: false => question optional hai (jaise screenshot me 25, 27, 35)

export const usageOptions = [
  "Daily work",
  "Meetings",
  "Occasional visit",
  "Just visiting",
];

// Screenshot me dropdown "- Select -" tha, options nahi dikhe.
// Yahan apne hisaab se change kar lena.
export const lastUsedOptions = [
  "Within the last month",
  "1 - 3 months ago",
  "3 - 6 months ago",
  "6 - 12 months ago",
];

export const ratingScale = [5, 4, 3, 2, 1];

export const ratingQuestions = [
  { id: "q5", number: 5, label: "Public transport serving the office", required: true },
  { id: "q6", number: 6, label: "Transport Info Counter", required: true },
  { id: "q7", number: 7, label: "Taxi availability / prices", required: true },
  { id: "q8", number: 8, label: "Signage for Public Transport", required: true },
  { id: "q9", number: 9, label: "Signage to Check-In", required: true },
  { id: "q10", number: 10, label: "Signage to Security / Entry", required: true },
  { id: "q11", number: 11, label: "Signage for Office facilities", required: true },
  { id: "q12", number: 12, label: "Signage to Meeting rooms", required: true },
  { id: "q13", number: 13, label: "Walking distance to Meeting Rooms", required: true },
  { id: "q14", number: 14, label: "Signage to Parking area", required: true },
  { id: "q15", number: 15, label: "Walking distance between Departments", required: true },
  { id: "q16", number: 16, label: "Waiting times for Security screening", required: true },
  { id: "q17", number: 17, label: "Service of Security staff", required: true },
  { id: "q18", number: 18, label: "Waiting times for Reception", required: true },
  { id: "q19", number: 19, label: "Service of Reception staff", required: true },
  { id: "q20", number: 20, label: "Cleanliness of office public areas", required: true },
  { id: "q21", number: 21, label: "Cleanliness of Washrooms", required: true },
  { id: "q22", number: 22, label: "Standard of air conditioning / temperatures", required: true },
  { id: "q23", number: 23, label: "Availability of customer seating", required: true },
  { id: "q24", number: 24, label: "Seat power / charging facilities", required: true },
  { id: "q25", number: 25, label: "Children's play facilities", required: false },
  { id: "q26", number: 26, label: "TV / entertainment facilities", required: true },
  { id: "q27", number: 27, label: "PRM / Disabled access and facilities", required: false },
  { id: "q28", number: 28, label: "Standard of office WiFi service", required: true },
  { id: "q29", number: 29, label: "Standard of display screens around office", required: true },
  { id: "q30", number: 30, label: "Choice of coffee shops and restaurants", required: true },
  { id: "q31", number: 31, label: "Choice of nearby shopping", required: true },
  { id: "q32", number: 32, label: "Availability of INFO / HELP counters and staff", required: true },
  { id: "q33", number: 33, label: "Friendliness of office staff", required: true },
  { id: "q34", number: 34, label: "Office staff language skills", required: true },
  { id: "q35", number: 35, label: "Parcel / courier delivery times", required: false },
];
