export class Turn{
	constructor(
		public hourFrom: any,
		public hourUntil: any,
		public totalHour: number,
		public totalToPay: number,
		public field: string,
		public user: string,
		public client: string
	){}
}