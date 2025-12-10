'use client';

import { BASE_URL } from '@/constants/env';
import { Client } from '@stomp/stompjs';

import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import Cookies from 'js-cookie';
import { useNotificationsActions } from '../model/store';

export default function useConnectAlarmWebSocket() {
  const alarmStompRef = useRef<Client | null>(null);
  const accessToken = Cookies.get('accessToken');

  const { setNotification, setRealTimeNotification } = useNotificationsActions();

  useEffect(() => {
    if (!accessToken) {
      console.log('No token, skipping WebSocket connection');
      return;
    }
    // 이미 연결된 경우 재연결 방지
    if (alarmStompRef.current) {
      console.log('🟡 Alarm STOMP already connected');
      return;
    }
    // 소켓 연결
    const socket = new SockJS(`${BASE_URL}/ws?token=${accessToken}`);

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 10000, // 10초마다 서버로부터 ping 체크
      heartbeatOutgoing: 10000, // 10초마다 클라이언트 -> 서버 ping 전송
      onConnect: () => {
        console.log('✅ Alarm WebSocket connected');

        client.subscribe('/user/queue/notification', (message) => {
          try {
            const body = JSON.parse(message.body);
            setRealTimeNotification(body);
          } catch (e) {
            console.error('신규 알림 파싱 실패', e);
          }
        });

        client.subscribe('/user/queue/notifications', (message) => {
          try {
            const body = JSON.parse(message.body);
            setNotification(body);
          } catch (e) {
            console.error('❌ 알림리스트 파싱 실패', e);
          }
        });

        ApiHelper.get(API_URL.NOTIFICATIONS);
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
  }, [accessToken]);
}
