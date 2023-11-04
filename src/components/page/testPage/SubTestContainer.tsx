import withTestResponse, { WithTestResponseProps } from "../../../common/hoc/withTestResponse";
import { SubTestName } from "../../../common/reducer/testResponseReducer";

interface SubTestTitleContainerProps extends WithTestResponseProps{
  subTestComponent: React.ComponentType<WithTestResponseProps>
}

function SubTestTitleContainer({testIndex, testResponse, setTestResponse, strings, subTestComponent}: SubTestTitleContainerProps){
  
  return(
      <div className='w-full h-full flex flex-col space-y-8'>      
      {
        (Object.entries(strings.subTests) as [k: SubTestName, subTest: any][]).map(([subTestName, subTest]) => {
          const TestWithResponse = withTestResponse(subTestComponent)(testIndex);
          return(
            <TestWithResponse/>
          )
        })
      }
      </div>
  );
}

export default SubTestTitleContainer;