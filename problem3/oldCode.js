interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {
  //// props get extended from BoxProps, but there is no describtion about BoxProps
}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props; /////unnecessary destructuring, can cause error if children is empty, can just use props
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    ////blockchain type can be string to make it more safety and more meaning
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
        const balancePriority = getPriority(balance.blockchain); ////balancePriority get declared but never get used
        if (lhsPriority > -99) {
          //// some variables in this code haven't get declared, lhsPriority and BoxProps didn't get declared, and also get mention only 1 time in the code
          //// i believe this isn't full code and they have been declared above in the main code, but if they haven't then this is definitely wrong
          ////in that case i think this is a variable name mistake and balancePriority should replace lhsPriority as it never get used
          if (balance.amount <= 0) {
            return true; //this 2 if statement can be merge into 1 statement, aviid nested if statement
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          ////more nested if statement that can reduce to 1 or less
          ////missed return 0 from sorting which may cause less stability
          return 1;
        }
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    //formattedBalances didn't get use yet
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      ////// wrong typing of formattedBalances so this wasn't declared
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
