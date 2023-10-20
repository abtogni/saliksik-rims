<script lang='ts'>
const menus = [
  {title: "Home", href: '/'},
  {title: "Researches"},
  {title: "Concept Notes"},
  {title: "Presentations",},
  {title: "My Profile"},
];

</script>


<button>Menu</button>

<aside>
    <div>
        <ul>
            {#each menus as menu}
                 <li>
                    <a href={menu.href}>{menu.title}</a>
                 </li>
            {/each}
        </ul>
        
    </div>
</aside>

<slot><!-- optional fallback --></slot>