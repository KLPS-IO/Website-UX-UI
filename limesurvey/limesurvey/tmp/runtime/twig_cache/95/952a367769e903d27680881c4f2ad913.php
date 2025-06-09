<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* ./subviews/survey/question.twig */
class __TwigTemplate_a7cfcd5d1f00fcff1bce1c10fe33c656 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 28
        yield "

";
        // line 31
        $context["aShow"] = CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aShow", [], "any", false, false, true, 31);
        // line 32
        yield "
    <!-- Question ";
        // line 33
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aQuestion"] ?? null), "code", [], "any", false, false, true, 33), 33, $this->source);
        yield " -->

    ";
        // line 36
        yield "    ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/survey/question_subviews/question_text_container.twig");
        yield "

    ";
        // line 39
        yield "    ";
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 39), "questionhelptextposition", [], "any", false, false, true, 39) != "bottom")) {
            // line 40
            yield "        ";
            yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/survey/question_subviews/survey_question_help.twig");
            yield "
    ";
        }
        // line 42
        yield "
    ";
        // line 44
        yield "    ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/survey/question_subviews/valid_message_and_help.twig");
        yield "

    ";
        // line 47
        yield "    ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/survey/question_subviews/answers.twig");
        yield "

    ";
        // line 50
        yield "    ";
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 50), "questionhelptextposition", [], "any", false, false, true, 50) == "bottom")) {
            // line 51
            yield "        ";
            yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/survey/question_subviews/survey_question_help.twig");
            yield "
    ";
        }
        // line 53
        yield "    
    <!-- End of question ";
        // line 54
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aQuestion"] ?? null), "code", [], "any", false, false, true, 54), 54, $this->source);
        yield " -->
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/survey/question.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  96 => 54,  93 => 53,  87 => 51,  84 => 50,  78 => 47,  72 => 44,  69 => 42,  63 => 40,  60 => 39,  54 => 36,  49 => 33,  46 => 32,  44 => 31,  40 => 28,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/survey/question.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/survey/question.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 31, "if" => 39);
        static $filters = array();
        static $functions = array("include" => 36);

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                [],
                ['include'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
