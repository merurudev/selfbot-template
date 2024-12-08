export function Error(e: string | unknown) {
	return '**エラーが発生しました。**\n' + e;
}

export const StdMsgs = {
	noPerm: '**権限がありません**',
};
