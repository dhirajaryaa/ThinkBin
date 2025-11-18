import { getCurrentUser } from "@/actions/auth/getCurrentUser"

async function  page() {
    const token = await getCurrentUser();
    console.log(token);
    
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, quia ipsa explicabo, accusamus eum eos assumenda saepe eveniet ab illo commodi iure! Vero saepe minima porro? Rerum ratione quo mollitia?
    </div>
  )
}

export default page
