import { Github, GithubIcon } from "lucide-react";
import { ProviderBtn } from "./provider-btn";

export function AuthProvider () {
  return (
    <div className="flex flex-col items-center justify-between mt-6 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <div className="h-0.5 w-full bg-gray-200"/>
        <span>or</span>
        <div className="h-0.5 w-full bg-gray-200"/>
      </div>
      <div className="flex items-center gap-4 w-full">
        <ProviderBtn 
          provider="google"
          icon={<GithubIcon size={16}/>}
          label="Google"
        />
        <ProviderBtn 
          provider="github"
          icon={<Github size={16} />}
          label="GitHub"
        />
      </div>
    </div>
  )
}