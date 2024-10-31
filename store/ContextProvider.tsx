import { AnswerProvider } from './AnswerContext';
import { QuestionProvider } from './QuestionContext';

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AnswerProvider>
            <QuestionProvider>{children}</QuestionProvider>
        </AnswerProvider>
    );
};

export default ContextProvider;
