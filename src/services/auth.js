// Secure Authentication Service with SHA-256 Password Hashing & Role Control

// Pre-computed SHA-256 hash for default password: "Password@123"
// echo -n "Password@123" | sha256sum -> ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f
const DEFAULT_HASH = 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f';

export const USER_ROLES = {
  PUBLIC: 'public',
  ROAD: 'road',
  ELECTRICAL: 'electrical',
  WASTE: 'waste'
};

export const ROLE_LABELS = {
  [USER_ROLES.PUBLIC]: 'Public Citizen',
  [USER_ROLES.ROAD]: 'Road Maintenance',
  [USER_ROLES.ELECTRICAL]: 'Electrical Division',
  [USER_ROLES.WASTE]: 'Waste Management'
};

// Seeded users with hashed passwords
const REGISTERED_USERS = [
  {
    id: 'USR-PUB-01',
    email: 'citizen@urbanpulse.gov.in',
    username: 'citizen',
    passwordHash: DEFAULT_HASH,
    name: 'Ananya Sharma',
    role: USER_ROLES.PUBLIC,
    department: 'Civilian'
  },
  {
    id: 'USR-ROD-01',
    email: 'roads@urbanpulse.gov.in',
    username: 'road_admin',
    passwordHash: DEFAULT_HASH,
    name: 'Er. Manoj Kumar',
    role: USER_ROLES.ROAD,
    department: 'Road Infrastructure & Maintenance'
  },
  {
    id: 'USR-ELE-01',
    email: 'electrical@urbanpulse.gov.in',
    username: 'electrical_admin',
    passwordHash: DEFAULT_HASH,
    name: 'Er. Sunita Rao',
    role: USER_ROLES.ELECTRICAL,
    department: 'Electrical & Street Lighting Division'
  },
  {
    id: 'USR-WST-01',
    email: 'waste@urbanpulse.gov.in',
    username: 'waste_admin',
    passwordHash: DEFAULT_HASH,
    name: 'Officer Rajesh Patil',
    role: USER_ROLES.WASTE,
    department: 'Solid Waste Management & Sanitation'
  }
];

const AUTH_STORAGE_KEY = 'urbanpulse_auth_session_v1';
const USERS_STORAGE_KEY = 'urbanpulse_users_v1';

// Hash password using browser Web Crypto API
export async function hashPassword(plainText) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(REGISTERED_USERS));
      return REGISTERED_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : REGISTERED_USERS;
  } catch {
    return REGISTERED_USERS;
  }
}

export async function authenticateUser({ identifier, password, role }) {
  if (!identifier || !password) {
    throw new Error('Please enter both email/username and password.');
  }

  const users = getUsers();
  const cleanId = identifier.trim().toLowerCase();
  const hashedInput = await hashPassword(password);

  // Match by email or username
  const matchedUser = users.find(
    u => (u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId)
  );

  if (!matchedUser) {
    throw new Error('User not found. Check your credentials or select the correct role.');
  }

  if (matchedUser.passwordHash !== hashedInput) {
    throw new Error('Invalid password. Please check and try again.');
  }

  // Verify role matches selected role
  if (role && matchedUser.role !== role) {
    throw new Error(`Role mismatch: This account belongs to ${ROLE_LABELS[matchedUser.role]}, not ${ROLE_LABELS[role]}.`);
  }

  const session = {
    token: `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    user: {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      username: matchedUser.username,
      role: matchedUser.role,
      department: matchedUser.department
    },
    loginTime: new Date().toISOString()
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  return session.user;
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session?.user || null;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

// Helper to register public citizen if needed
export async function registerPublicUser({ name, email, username, password }) {
  const users = getUsers();
  const cleanEmail = email.trim().toLowerCase();
  const cleanUsername = username.trim().toLowerCase();

  if (users.some(u => u.email.toLowerCase() === cleanEmail || u.username.toLowerCase() === cleanUsername)) {
    throw new Error('An account with this email or username already exists.');
  }

  const passwordHash = await hashPassword(password);
  const newUser = {
    id: `USR-PUB-${Date.now().toString().slice(-4)}`,
    email: cleanEmail,
    username: cleanUsername,
    passwordHash,
    name: name.trim(),
    role: USER_ROLES.PUBLIC,
    department: 'Civilian'
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return newUser;
}
