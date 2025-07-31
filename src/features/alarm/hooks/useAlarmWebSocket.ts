'use client';

import { BASE_URL } from '@/constants/env';

import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { sharedAlarmStompRef } from '../store/sharedAlarmStompRef';

export default function useConnectAlarmWebSocket() {
  const alarmStompRef = sharedAlarmStompRef;
  const [alarm, setAlarm] = useState(null);
  useEffect(() => {
    // 이미 연결된 경우 재연결 방지
    if (alarmStompRef.current) {
      console.log('🟡 Alarm STOMP already connected');
      return;
    }

    // 소켓 연결
    const socket = new SockJS(`${BASE_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ Alarm WebSocket connected');

        client.subscribe('/user/queue/notification', (message) => {
          try {
            const body = JSON.parse(message.body);
            console.log('📥 알림 수신:', body);
            setAlarm(body);
          } catch (e) {
            console.error('❌ 알림 파싱 실패', e);
          }
        });
      },
      onStompError: (frame) => {
        console.error('❌ STOMP Error', frame);
      },
    });

    // 전역 ref에 저장
    alarmStompRef.current = client;
    client.activate();

    // 언마운트 시 정리
    return () => {
      console.log('🔌 Cleaning up Alarm STOMP client');
      client.deactivate();
      alarmStompRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { alarmStompRef, alarm };
}
