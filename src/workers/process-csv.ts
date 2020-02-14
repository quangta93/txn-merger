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

  if (!lines?.length) {
    return 0;
  }

  const transactions: ITransaction[] = [];

  const headers: string[] = lines[0].split(',').map(h => h.toLowerCase());

  lines.slice(1).forEach(line => {
    const tokens = line.split(',');
    const transaction: any = {};

    headers.forEach((key: string, index: number) => {
      switch (key) {
        case 'amount': {
          transaction[key] = Number(tokens[index]);
          break;
        }

        case 'tags': {
          transaction[key] = tokens[index].split(',').filter(tag => !!tag);
          break;
        }

        default: {
          transaction[key] = tokens[index].startsWith('"')
            ? tokens[index].slice(1, -1)
            : tokens[index];
        }
      }
    });

    transactions.push(transaction as ITransaction);
  });

  console.log('TCL: transactions', transactions.slice(0, 5));
  return transactions.length;
};
