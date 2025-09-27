import Image from 'next/image'
interface MainComponentProps {
  poolAmount: number;
  borrowedAmount: number;
  lentAmount: number;
}
const PyusdCard = ({ poolAmount, borrowedAmount, lentAmount }: MainComponentProps) => {
  return (
    <div className="p-8 w-full h-[200px] bg-[#1F1F21] flex-col  rounded-4xl">
                    <div className="text-3xl  p-2 flex">
                      <Image
                        src="/paypalUSD-1.png"
                        alt="Description"
                        width={50}
                        height={50}
                      />
                      <div className="pl-4 pt-2">PyUSD</div>
                    </div>
                    <div className="flex p-2 pt-3 mt-auto">
                      <div className="flex flex-col pr-20">
                        <div className="text-gray-400 text-sm mb-1">
                          Pool Amount
                        </div>
                        <div className="text-3xl">${poolAmount}</div>
                      </div>
    
                      <div className="flex flex-col px-20">
                        <div className="text-gray-400 text-sm mb-1">
                          Borrowed Amount
                        </div>
                        <div className="text-3xl">${borrowedAmount}</div>
                      </div>
    
                      <div className="flex flex-col px-20">
                        <div className="text-gray-400 text-sm mb-1">
                          Lent Amount
                        </div>
                        <div className="text-3xl">${lentAmount}</div>
                      </div>
                    </div>
                  </div>
  )
}

export default PyusdCard;
