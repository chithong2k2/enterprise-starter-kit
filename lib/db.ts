import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');
const TMP_DB_PATH = path.join('/tmp', 'db.json');

export interface PageSection {
  id: string;
  type: 'hero' | 'logos' | 'about' | 'services' | 'projects' | 'team' | 'testimonials' | 'faq' | 'cta' | 'posts' | 'contact';
  variant: string;
  title: string;
  enabled: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface PageConfig {
  headerVariant: 'topbar' | 'classic' | 'centered' | 'floating';
  footerVariant: 'corporate' | 'minimal' | 'branded';
  navItems: NavItem[];
  sections: PageSection[];
}

export interface SiteSettings {
  companyName: string;
  slogan: string;
  hotline: string;
  email: string;
  address: string;
  workingHours: string;
  primaryColor: 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'slate';
  about: string;
  stats: { label: string; value: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDesc: string;
  features: string[];
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  initials: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientCompany: string;
  feedback: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ClientPartner {
  name: string;
}

export interface PostItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  content: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  result: string;
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface DatabaseSchema {
  pageConfig: PageConfig;
  settings: SiteSettings;
  services: ServiceItem[];
  team: TeamMember[];
  testimonials: TestimonialItem[];
  faq: FaqItem[];
  clients: ClientPartner[];
  posts: PostItem[];
  projects: ProjectItem[];
  leads: LeadItem[];
}

export async function getDatabase(): Promise<DatabaseSchema> {
  try {
    const rawTmp = await fs.readFile(TMP_DB_PATH, 'utf-8');
    return JSON.parse(rawTmp);
  } catch {
    // Fallback to bundled data/db.json
  }
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading db.json:', error);
    throw new Error('Database read failed');
  }
}

export async function saveDatabase(data: DatabaseSchema): Promise<void> {
  const serialized = JSON.stringify(data, null, 2);
  try {
    await fs.writeFile(DB_PATH, serialized, 'utf-8');
  } catch {
    // ponytail: Vercel serverless /var/task is read-only (EROFS); persist to /tmp/db.json per instance
    await fs.writeFile(TMP_DB_PATH, serialized, 'utf-8');
  }
}

// Helpers
export async function getPageConfig(): Promise<PageConfig> {
  const db = await getDatabase();
  return db.pageConfig;
}

export async function updatePageConfig(config: Partial<PageConfig>): Promise<PageConfig> {
  const db = await getDatabase();
  db.pageConfig = { ...db.pageConfig, ...config };
  await saveDatabase(db);
  return db.pageConfig;
}

export async function getSettings(): Promise<SiteSettings> {
  const db = await getDatabase();
  return db.settings;
}

export async function updateSettings(newSettings: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = await getDatabase();
  db.settings = { ...db.settings, ...newSettings };
  await saveDatabase(db);
  return db.settings;
}

export async function getServices(): Promise<ServiceItem[]> {
  const db = await getDatabase();
  return db.services.sort((a, b) => a.order - b.order);
}

export async function addService(item: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
  const db = await getDatabase();
  const newService: ServiceItem = {
    ...item,
    id: `srv-${Date.now()}`
  };
  db.services.push(newService);
  await saveDatabase(db);
  return newService;
}

export async function updateService(id: string, item: Partial<ServiceItem>): Promise<ServiceItem | null> {
  const db = await getDatabase();
  const index = db.services.findIndex(s => s.id === id);
  if (index === -1) return null;
  db.services[index] = { ...db.services[index], ...item };
  await saveDatabase(db);
  return db.services[index];
}

export async function deleteService(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLen = db.services.length;
  db.services = db.services.filter(s => s.id !== id);
  if (db.services.length === initialLen) return false;
  await saveDatabase(db);
  return true;
}

export async function getTeam(): Promise<TeamMember[]> {
  const db = await getDatabase();
  return db.team || [];
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const db = await getDatabase();
  return db.testimonials || [];
}

export async function getFaq(): Promise<FaqItem[]> {
  const db = await getDatabase();
  return db.faq || [];
}

export async function getClients(): Promise<ClientPartner[]> {
  const db = await getDatabase();
  return db.clients || [];
}

export async function getPosts(): Promise<PostItem[]> {
  const db = await getDatabase();
  return db.posts;
}

export async function addPost(item: Omit<PostItem, 'id' | 'date'>): Promise<PostItem> {
  const db = await getDatabase();
  const now = new Date();
  const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
  const newPost: PostItem = {
    ...item,
    id: `post-${Date.now()}`,
    date: formattedDate
  };
  db.posts.unshift(newPost);
  await saveDatabase(db);
  return newPost;
}

export async function deletePost(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLen = db.posts.length;
  db.posts = db.posts.filter(p => p.id !== id);
  if (db.posts.length === initialLen) return false;
  await saveDatabase(db);
  return true;
}

export async function getProjects(): Promise<ProjectItem[]> {
  const db = await getDatabase();
  return db.projects;
}

export async function getLeads(): Promise<LeadItem[]> {
  const db = await getDatabase();
  return db.leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addLead(item: Omit<LeadItem, 'id' | 'status' | 'createdAt'>): Promise<LeadItem> {
  const db = await getDatabase();
  const newLead: LeadItem = {
    ...item,
    id: `lead-${Date.now()}`,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  db.leads.unshift(newLead);
  await saveDatabase(db);
  return newLead;
}

export async function updateLeadStatus(id: string, status: 'new' | 'contacted' | 'closed'): Promise<boolean> {
  const db = await getDatabase();
  const target = db.leads.find(l => l.id === id);
  if (!target) return false;
  target.status = status;
  await saveDatabase(db);
  return true;
}

export async function deleteLead(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLen = db.leads.length;
  db.leads = db.leads.filter(l => l.id !== id);
  if (db.leads.length === initialLen) return false;
  await saveDatabase(db);
  return true;
}
