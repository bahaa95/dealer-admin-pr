import { Metadata } from "next";
import { WalletPage } from "./_components/WalletPage";

export const metadata: Metadata = {
  title: "معلومات المحفظة",
};

const Wallet = () => {
  return (
    <div>
      <WalletPage />
    </div>
  );
};

export default Wallet;
