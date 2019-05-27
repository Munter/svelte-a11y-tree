<script>
  import TreeMenu from "./components/TreeMenu.svelte";

  const structure = [
    {
      type: "group",
      label: "Fruits",
      children: [
        {
          type: "link",
          label: "Apple",
          href: "#apple"
        },
        {
          type: "link",
          label: "Orange",
          href: "#orange"
        },
        {
          type: "group",
          label: "Unknowns",
          children: [
            {
              type: "link",
              label: "Peanut",
              href: "#peanut"
            }
          ]
        },
        {
          type: "link",
          label: "Banana",
          href: "#banana"
        },
        {
          type: "link",
          label: "Strawberry",
          href: "#strawberry"
        }
      ]
    },
    {
      type: "group",
      label: "Vegetables",
      children: [
        {
          type: "link",
          label: "Potato",
          href: "#potato"
        },
        {
          type: "link",
          label: "Cucumber",
          href: "#cucumber"
        },
        {
          type: "link",
          label: "Onion",
          href: "#Onion"
        },
        {
          type: "link",
          label: "Tomato",
          href: "#tomato"
        }
      ]
    },
    {
      type: "group",
      label: "Unknowns1",
      children: [
        {
          type: "link",
          label: "Peanut",
          href: "#peanut"
        }
      ]
    },
    {
      type: "group",
      label: "Unknowns2",
      children: [
        {
          type: "link",
          label: "Peanut",
          href: "#peanut"
        }
      ]
    },
    {
      type: "group",
      label: "Unknowns3",
      children: [
        {
          type: "link",
          label: "Peanut",
          href: "#peanut"
        }
      ]
    },
    {
      type: "link",
      label: "Potato",
      href: "#potato"
    },
    {
      type: "link",
      label: "Cucumber",
      href: "#cucumber"
    },
    {
      type: "link",
      label: "Onion",
      href: "#Onion"
    },
    {
      type: "link",
      label: "Tomato",
      href: "#tomato"
    }
  ];

  export let name;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {name}!</h1>

<button>Before</button>

<TreeMenu {structure} />

<button>After</button>
