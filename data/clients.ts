// Edit this file to provide real client logos and video review URLs.
// Logos and videos can be local public paths (e.g. '/assets/client-logos/logo1.png')
// or remote URLs (https://...).

export type Client = {
  name: string;
  logo?: string; // image path or url
  video?: string; // mp4/webm url or path
  poster?: string; // optional poster image for video
};

export const clients: Client[] = [
  {
    name: 'HVAC Service, Chicago',
    logo: '/assets/client-logos/hvac-logo.png',
    video: '/assets/client-videos/hvac-review.mp4',
    poster: '/assets/client-videos/hvac-thumb.jpg',
  },
  {
    name: 'AC Repair NYC',
    logo: '/assets/client-logos/ac-logo.png',
    video: '/assets/client-videos/ac-review.mp4',
    poster: '/assets/client-videos/ac-thumb.jpg',
  },
  {
    name: 'Local Plumbing Co',
    logo: '/assets/client-logos/plumbing-logo.png',
    video: '/assets/client-videos/plumbing-review.mp4',
    poster: '/assets/client-videos/plumbing-thumb.jpg',
  },
];
