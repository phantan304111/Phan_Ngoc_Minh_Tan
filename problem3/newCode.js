interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
  ///add blockchain and type
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = () => {
  //// const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    ////use string as blockchain's type instead of any
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0; // correct the variable name to balancePriority, remove 2 nested if statement
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority || 0; // remove 2 nested if statement and add return 0
      });
  }, [balances, prices]);

  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {//formattedBalances didn't get use yet, so i com ment it
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed()
  //   }
  // })

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );
  return <div {...rest}>{rows}</div>;
};
