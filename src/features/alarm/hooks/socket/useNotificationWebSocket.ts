'use client';

import { BASE_URL } from '@/constants/env';
import { Client } from '@stomp/stompjs';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { sharedAlarmStompRef } from '../../store/sharedAlarmStompRef';
import { useNotificationsStore } from '../../model/store';
import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';

export default function useConnectAlarmWebSocket() {
  const { setNotification } = useNotificationsStore();
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    const fetchSession = async () => {
      const data = await getSession();
      const rawToken = data?.accessToken || '';
      // "Bearer " 접두어 제거 (있을 때만)
      const cleanedToken = rawToken.startsWith('Bearer ') ? rawToken.slice(7) : rawToken;
      setAccessToken(cleanedToken);
    };
    fetchSession();
  }, []);
  // console.log(session.then((data)=>console.log(encodeURI(data?.accessToken || ""))))
  const alarmStompRef = sharedAlarmStompRef;

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
    console.log(accessToken);
    // 소켓 연결
    const socket = new SockJS(`${BASE_URL}/ws?token=${accessToken}`);

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ Alarm WebSocket connected');

        client.subscribe('/user/queue/notifications', (message) => {
          try {
            const body = JSON.parse(message.body);
            console.log('📥 알림 수신:', body);
            setNotification(body);
          } catch (e) {
            console.error('❌ 알림 파싱 실패', e);
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

  return { alarmStompRef };
}
