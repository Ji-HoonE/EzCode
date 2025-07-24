import { NotificationList } from './_ui/List';

const Notifications = () => {
  return (
    <div className="flex flex-col gap-10 pt-[100px] px-4">
      <h1>상세 알림 페이지</h1>
      <NotificationList />
    </div>
  );
};

export default Notifications;
