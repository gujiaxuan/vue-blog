import { NAV_MAP } from "@/constants";
import type { FunctionalComponent } from "vue";
import Switch from './switch.vue';

import './style.less';

type FComponentProps = {
  active: string;
  handleActive: (key: string) => void;
}

const TopNav: FunctionalComponent<FComponentProps> = ({
  active,
  handleActive
}) => {

  return <div class=" bg-white w-[200px] h-full items-center flex-col flex ">
    <Switch />
    <div class="p-[16px] rounded-[18px] text-[36px] m-[10px] bg-white shadow-[0_4px_10px_#ddeeffc4] ">My Blog</div>
    {
      NAV_MAP.map(item =>
        <div
          key={item.path}
          onClick={() => handleActive(item.path)}
          class={`p-[20px] text-[25px] relative ${active === item.path && 'active'} before:bg-black`}
        >
          {item.title}
        </div>
      )
    }
  </div>
};

export default TopNav;
