export interface ITransaction {
  date: string;
  account: string;
  description: string;
  category: string;
  tags?: string[];
  amount: number;
}

export interface IProcess {
  (csv: string): Promise<number>;
}

export const process: IProcess = async csv => {
  const lines: string[] = csv.split('\n');

  if (lines?.length) {
    return 0;
  }

  const transactions: ITransaction[] = [];

  const headers: string[] = lines[0].split(',').map(h => h.toLowerCase());

  lines.slice(1).forEach(line => {
    const tokens = line.split(',');
    const transaction: any = {};

    headers.forEach((key: string, index: number) => {
      transaction[key] =
        key === 'amount' ? Number(tokens[index]) : tokens[index];
    });

    transactions.push(transaction as ITransaction);
  });

  return transactions.length;
};
