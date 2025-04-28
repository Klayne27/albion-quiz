import { useState } from "react";

const roles = ["DPS", "Healer", "D-Tank", "O-Tank", "Support"];

export default function RoleDropdown({ selectRole, setSelectRole }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedRole) => {
    setSelectRole(selectedRole);
    setIsOpen(false);
  };

  const displayTextClass = selectRole ? "text-[#4e2c08]" : "text-[#926e47]";

  return (
    <div className="relative w-full cursor-[url('src/assets/cursor.png'),_auto]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-b from-[#FFD8AF] via-[#cea985] to-[#a3886b] placeholder:text-[#926e47] border-3 border-gray-500 text-[#4e2c08] text-sm 
               rounded-full
                w-full px-3.5 flex justify-between
        `}
      >
        <span className={`${displayTextClass}`}>{selectRole || "Select a role"}</span>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 18"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-[#FFD8AF] border-3 border-gray-600 rounded-lg shadow-lg
                     cursor-[url('src/assets/cursor.png'),_auto]"
        >
          {roles.map((r) => (
            <li
              key={r}
              onClick={() => handleSelect(r)}
              className={`hover:bg-[#a3886b] cursor-[url('src/assets/cursor.png'),_auto] bg-[#FFD8AF] rounded-lg text-[#4e2c08] text-sm select-none`}
            >
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
