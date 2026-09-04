const dashboardStats = [
  {
    id: 'registered-donors',
    label: 'Registered donors',
    value: 1284,
    supportingText: 'Across registered donor profiles',
    icon: 'users',
    tone: 'neutral',
  },
  {
    id: 'potentially-eligible',
    label: 'Potentially eligible donors',
    value: 742,
    supportingText: 'Based on current profile status',
    icon: 'user-check',
    tone: 'success',
  },
  {
    id: 'active-requests',
    label: 'Active requests',
    value: 18,
    supportingText: '6 requests marked urgent',
    icon: 'clipboard-heart',
    tone: 'danger',
  },
  {
    id: 'notifications-sent',
    label: 'Notifications sent',
    value: 346,
    supportingText: 'During the last 30 days',
    icon: 'bell-ring',
    tone: 'warning',
  },
];

const quickActions = [
  {
    id: 'request-blood',
    label: 'Request Blood',
    description: 'Start a new blood request for a hospital or care team.',
    icon: 'clipboard-plus',
    emphasis: 'primary',
    status: 'Coming soon',
  },
  {
    id: 'become-donor',
    label: 'Become a Donor',
    description: 'Create a donor profile and share availability details.',
    icon: 'heart-handshake',
    emphasis: 'secondary',
    status: 'Coming soon',
  },
  {
    id: 'browse-directory',
    label: 'Browse Donor Directory',
    description: 'Explore registered donor profiles by location and blood group.',
    icon: 'search',
    emphasis: 'secondary',
    status: 'Coming soon',
  },
];

const urgentRequests = [
  {
    id: 'REQ-2408',
    bloodType: 'O-',
    units: 3,
    district: 'Colombo',
    hospital: 'National Hospital of Sri Lanka',
    urgency: 'Critical',
    requestAge: '18 min ago',
  },
  {
    id: 'REQ-2406',
    bloodType: 'A+',
    units: 2,
    district: 'Kandy',
    hospital: 'National Hospital Kandy',
    urgency: 'High',
    requestAge: '42 min ago',
  },
  {
    id: 'REQ-2403',
    bloodType: 'B-',
    units: 4,
    district: 'Galle',
    hospital: 'Teaching Hospital Karapitiya',
    urgency: 'High',
    requestAge: '1 hr ago',
  },
  {
    id: 'REQ-2399',
    bloodType: 'AB-',
    units: 2,
    district: 'Jaffna',
    hospital: 'Teaching Hospital Jaffna',
    urgency: 'Critical',
    requestAge: '2 hrs ago',
  },
];

const bloodAvailability = [
  { bloodType: 'A+', availableDonors: 186 },
  { bloodType: 'A-', availableDonors: 42 },
  { bloodType: 'B+', availableDonors: 164 },
  { bloodType: 'B-', availableDonors: 38 },
  { bloodType: 'AB+', availableDonors: 76 },
  { bloodType: 'AB-', availableDonors: 21 },
  { bloodType: 'O+', availableDonors: 198 },
  { bloodType: 'O-', availableDonors: 17 },
];

const recentMatches = [
  {
    id: 'MAT-1086',
    bloodType: 'O-',
    district: 'Colombo',
    matchScore: 94,
    notificationStatus: 'Sent',
    updatedTime: '12 min ago',
  },
  {
    id: 'MAT-1084',
    bloodType: 'A+',
    district: 'Kandy',
    matchScore: 88,
    notificationStatus: 'Delivered',
    updatedTime: '35 min ago',
  },
  {
    id: 'MAT-1081',
    bloodType: 'B-',
    district: 'Galle',
    matchScore: 82,
    notificationStatus: 'Pending',
    updatedTime: '1 hr ago',
  },
  {
    id: 'MAT-1077',
    bloodType: 'AB+',
    district: 'Kurunegala',
    matchScore: 79,
    notificationStatus: 'Sent',
    updatedTime: '3 hrs ago',
  },
];

export {
  bloodAvailability,
  dashboardStats,
  quickActions,
  recentMatches,
  urgentRequests,
};
