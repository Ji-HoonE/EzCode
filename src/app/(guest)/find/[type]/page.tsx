'use client';

import { useParams } from 'next/navigation';


export default function FindPage() {
    const params = useParams();
    const type = params.type as string;

    return (
        <div>
            {type === 'id' ? (
                <div>아이디찾기</div>
            ) : type === 'password' ? (
                <div>비밀번호찾기</div>
            ) : (
                <div>잘못된 접근입니다.</div>
            )}
        </div>
    );
}