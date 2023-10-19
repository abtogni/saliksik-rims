import { useState } from 'react'
import { Home, LayoutDashboard,CalendarDays, Library, Menu, Search} from 'lucide-react'



function AdminDashboard() {
const [open, setOpen] = useState(false);
const Menus = [
  {title: "Home"},
  {title: "Dashboard", icon: <LayoutDashboard/>},
  {title: "Calendar", icon: <CalendarDays/>},
  {title: "Library",icon:<Library/>},
  {title: "Bookmark library",},
  {title: "Bookmark Library"},
];
const handleItemClick = (title: string) =>{
  console.log(`Clicked: ${title}`);
}

  return (
     <div>
       <nav className="fixed top-0 z-50 w-full bg-white border-2"> 
        <div className="h-16 px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center">
                
              
           <Menu className="rounded hover:bg-gray-300 cursor-pointer"onClick={() =>setOpen (!open)}/>
           {/*saliksiklogo */}
          <img src="saliksiklogo.svg" className="h-6 mr-3 sm:h-7" alt="Saliksik logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Saliksik</span>
          <div className="flex items-center">
          <input type="search" className="rounded-full bg-blue-gray-100" />
          <Search className="hover:bg-gray-100 rounded cursor-pointer"/>
          </div>
              
                </div>
        </div>
        </nav> 

         <aside className="flex">
          <div className={`border-2 bg-white h-screen p-5 pt-8 ${open ? "w-72" : "w-20" }`}
          onMouseEnter={() => setOpen(true)} // Open the sidebar on mouse enter
          onMouseLeave={() => setOpen(false)} // Close the sidebar on mouse leave
          >
             
         

       <ul className="pt-2 mt-16">
        {Menus.map((menu, index) =>(
          <>
          <li key={index} className="cursor-pointer text-dark text-sm text-items-center flex gap-x-4
          hover:bg-backround hover:text-white rounded-md p-2 mt-2"
          onClick={() => handleItemClick(menu.title)}
          >
             
            <span className="text-2xl block float-left">
              {menu.icon ? menu.icon: <Home/>}

            </span>
            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>{menu.title}</span>

          </li>
          </>
        ))}
        
       
       </ul>
          </div>
          </aside>
       
       
          </div>
           

          
  )
}

export default AdminDashboard