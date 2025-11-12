export function detectDeviceType(ua: string) {
  const agent = ua.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(agent);
  return isMobile ? 'mobile' : 'desktop';
}
