import LinkedButton from '@/shared/ui/linkedButton';

import Notifications from './Notifications';
import { NAVIGATE_ATTRIBUTE } from '../navigateAttribute';
import AuthActions from './AuthActions';

export default async function NavigationBar() {
  return (
    <header className="border-b border-gray-800 bg-background/95 backdrop-blur-sm sticky top-0 z-50 h-18">
      <nav className="flex w-full justify-around items-center h-full p-4">
        <div className="flex items-center space-x-8">
          <LinkedButton props={NAVIGATE_ATTRIBUTE.root} />
          <LinkedButton props={NAVIGATE_ATTRIBUTE.problems} />
          <LinkedButton props={NAVIGATE_ATTRIBUTE.rank} />
          <Notifications />
        </div>
        <div className="flex items-center space-x-4">
          <AuthActions />
        </div>
      </nav>
    </header>
  );
}
