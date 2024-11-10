
interface Props {
    label: string;
    handleCount: () => void;
}

export const Button = ({ label, handleCount }: Props) => {

    return (
      <button className='bg-red-500 text-white px-4 py-2 font-semibold hover:bg-red-700' onClick={ handleCount }>
         {label}
      </button>
    );
}