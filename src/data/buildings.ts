import type { CampusLocation } from '@/types/campus'

// Sample dataset for the University of Skills Training and Entrepreneurial
// Development (USTED — formerly AAMUSTED), Kumasi (Tanoso) campus.
//
// IMPORTANT — coordinates are placeholders:
// The campus centerpoint below (6.6969, -1.6813) matches the university's
// published location, but individual building coordinates here are spaced
// out around that point for demo purposes only — they have NOT been
// surveyed against the real campus layout. Before shipping, replace these
// with real coordinates (walk the campus with a GPS app, or trace building
// footprints in Google Earth / OpenStreetMap) and correct the faculty/
// department assignments against the university's current structure —
// both can change from what's listed here.
export const buildings: CampusLocation[] = [
  {
    id: 'main-gate',
    name: 'Main Gate & Security Post',
    code: 'MG-1',
    category: 'landmark',
    coordinates: { lat: 6.6969, lng: -1.6813 },
    description: 'Visitor sign-in and campus orientation — start here.',
    accessibility: { stepFreeEntrance: true },
    hours: '24 hours (staffed 6:00 AM – 10:00 PM)',
  },
  {
    id: 'admin-block',
    name: 'Administration Block (Registrar\u2019s Office)',
    code: 'ADM-1',
    category: 'admin',
    coordinates: { lat: 6.6975, lng: -1.6806 },
    description: 'Registrar, admissions, and visitor pass issuance.',
    accessibility: { stepFreeEntrance: true },
    hours: '8:00 AM – 5:00 PM',
  },
  {
    id: 'fte-block',
    name: 'Faculty of Technical Education',
    code: 'FTE-1',
    category: 'academic',
    coordinates: { lat: 6.6980, lng: -1.6820 },
    description: 'Lecture halls and workshops for construction, wood, and mechanical technology programmes.',
    accessibility: { stepFreeEntrance: true },
    hours: '7:00 AM – 6:00 PM',
  },
  {
    id: 'fet-block',
    name: 'Faculty of Engineering and Technology',
    code: 'FET-1',
    category: 'academic',
    coordinates: { lat: 6.6987, lng: -1.6828 },
    description: 'Electrical, electronics, and automotive engineering labs and lecture theatres.',
    accessibility: { stepFreeEntrance: true, notes: 'Ramp at main entrance' },
    hours: '7:00 AM – 6:00 PM',
  },
  {
    id: 'fve-block',
    name: 'Faculty of Vocational Education',
    code: 'FVE-1',
    category: 'academic',
    coordinates: { lat: 6.6963, lng: -1.6825 },
    description: 'Fashion, catering, and vocational skills training studios.',
    accessibility: { stepFreeEntrance: true },
    hours: '7:00 AM – 6:00 PM',
  },
  {
    id: 'fasme-block',
    name: 'Faculty of Applied Sciences and Mathematics Education',
    code: 'FASME-1',
    category: 'academic',
    coordinates: { lat: 6.6958, lng: -1.6809 },
    description: 'Science labs and mathematics education lecture halls.',
    accessibility: { stepFreeEntrance: true },
    hours: '7:00 AM – 6:00 PM',
  },
  {
    id: 'fecs-block',
    name: 'Faculty of Education and Communication Sciences',
    code: 'FECS-1',
    category: 'academic',
    coordinates: { lat: 6.6972, lng: -1.6795 },
    description: 'Education, English, and communication sciences programmes.',
    accessibility: { stepFreeEntrance: true },
    hours: '7:00 AM – 6:00 PM',
  },
  {
    id: 'main-library',
    name: 'University Library',
    code: 'LIB-1',
    category: 'library',
    coordinates: { lat: 6.6969, lng: -1.6800 },
    description: 'Reading rooms, reference desk, and visitor day-pass access.',
    accessibility: { stepFreeEntrance: true },
    hours: '7:00 AM – 10:00 PM',
    amenities: ['restrooms'],
  },
  {
    id: 'dining-hall',
    name: 'Student Dining Hall',
    code: 'DIN-1',
    category: 'dining',
    coordinates: { lat: 6.6960, lng: -1.6798 },
    description: 'Cafeteria-style meals, open to visitors during service hours.',
    accessibility: { stepFreeEntrance: true },
    hours: '7:00 AM – 8:00 PM',
  },
  {
    id: 'sasco-hostel',
    name: 'SASCO Hostel',
    code: 'RES-1',
    category: 'residence',
    coordinates: { lat: 6.6950, lng: -1.6815 },
    description: 'Student residence hall — visitor access to reception only.',
    accessibility: { stepFreeEntrance: false, notes: 'Stairs at main entrance' },
  },
  {
    id: 'sports-field',
    name: 'Sports Field & Pavilion',
    code: 'ATH-1',
    category: 'athletics',
    coordinates: { lat: 6.6990, lng: -1.6800 },
    description: 'Football pitch, athletics track, and the sports directorate office.',
    accessibility: { stepFreeEntrance: true },
    hours: '6:00 AM – 7:00 PM',
  },
  {
    id: 'visitor-parking',
    name: 'Visitor Parking Area',
    code: 'PK-1',
    category: 'parking',
    coordinates: { lat: 6.6965, lng: -1.6820 },
    description: 'Parking near the main gate for visitors and guests.',
    accessibility: { stepFreeEntrance: true },
  },
]

export const categoryLabels: Record<string, string> = {
  academic: 'Faculty / Academic',
  dining: 'Dining',
  residence: 'Residence',
  athletics: 'Athletics',
  admin: 'Administration',
  library: 'Library',
  parking: 'Parking',
  landmark: 'Landmark',
}
