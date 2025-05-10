  
const Header = () => {
  return (
    <div className="bg-white p-4 border-b border-gray-200 flex items-center">
      <img src="/notes.svg" alt="Logo" className="h-10 w-10 text-amber-700 mr-2" />
      <h1 className="text-lg font-medium text-gray-800">Note App</h1>
    </div>
  );
};

export default Header;