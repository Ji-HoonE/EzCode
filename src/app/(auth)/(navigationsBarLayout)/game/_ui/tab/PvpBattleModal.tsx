import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface IPvpBattleModalProps {
  isOpen: boolean;
  onClose: () => void;
  battleData: IBattleData;
}

export interface IBattleData {
  enemyName: string;
  playerNickName: string;
  battleLog: string[];
  isPlayerWin: boolean;
}

const PvpBattleModal = ({ isOpen, onClose, battleData }: IPvpBattleModalProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>PVP 배틀</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <div>상대: {battleData?.enemyName}</div>
          <div>플레이어: {battleData?.playerNickName}</div>

          <div>
            {battleData?.battleLog?.map((log: string, idx: number) => <div key={idx}>{log}</div>)}
          </div>
          <div>{battleData?.isPlayerWin ? '승리' : '패배'}</div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PvpBattleModal;
