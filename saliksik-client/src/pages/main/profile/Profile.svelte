<script>
    import { Textarea, Label, Input } from 'flowbite-svelte';
</script>


<Label for="textarea-id" class="mb-2 text-2xl">Introduction</Label>
<Textarea id="textarea-id" placeholder="Introduce yourself and your Research" rows="4" name="message" />

<Label class="block space-y-2">
    <span class="text-2xl">Your email</span>
    <Input label="Email" id="email" name="email" required placeholder="name@example.com" />
  </Label>

  <div>
    <Label for="first_name" class="mb-2 text-2xl">Skills and expertise</Label>
    <Input type="text" id="first_name" placeholder="Enter Your Skills and expertise" required />
  </div>
  <div>
    <Label for="last_name" class="mb-2 text-2xl">Languages</Label>
    <Input type="text" id="last_name" placeholder=" Enter your Languages" required />
  </div>