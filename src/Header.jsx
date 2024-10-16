import Task from "./assets/task.png";
 //One way to use image to use it as expression

export default function Header() {
  return (
    <nav className="pt-2 fixed top-0 w-full !bg-[#191D26] z-50">
      <div className="container mx-auto flex items-center justify-between gap-x-6">
        <a href="/">
          <img className="h-[85px]" src={Task} alt="Task Manager" />
        </a>
      </div>
    </nav>
  );
}
