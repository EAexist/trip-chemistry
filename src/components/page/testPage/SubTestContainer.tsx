import withTestResponse, { WithTestResponseProps } from "../../../common/hocs/withTestResponse";
import { SubTestName } from "../../../common/reducer/testResponseReducer";

interface SubTestContainerProps extends WithTestResponseProps{
  subTestComponent: React.ComponentType<WithTestResponseProps>
}

function SubTestContainer({testName, testResponse, setTestResponse, strings, subTestComponent}: SubTestContainerProps){
  
  return(
      <div className='w-full h-full flex flex-col space-y-8'>      
      {
        (Object.entries(strings.subTests) as [k: SubTestName, subTest: any][]).map(([subTestName, subTest]) => {
          const TestWithResponse = withTestResponse(subTestComponent)({ testName, subTestName });
          return(
            <TestWithResponse/>
          )
        })
      }
      </div>
  );
}

export default SubTestContainer;