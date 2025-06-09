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

/* ./subviews/messages/welcome.twig */
class __TwigTemplate_eb9e767a456ef4d3db7dae3ef7377bfe extends Template
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
        // line 22
        yield "
<!-- Welcome Message -->
<div id=\"";
        // line 24
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "id", [], "any", false, false, true, 24), "welcomecontainer", [], "any", false, false, true, 24), 24, $this->source);
        yield "\" class=\"";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 24), "welcomecontainer", [], "any", false, false, true, 24), 24, $this->source);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 24), "welcomecontainer", [], "any", false, false, true, 24), 24, $this->source);
        yield ">

    <!-- Survey Name -->
    <div class=\"";
        // line 27
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 27), "surveyname", [], "any", false, false, true, 27), 27, $this->source);
        yield " large-heading\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 27), "surveyname", [], "any", false, false, true, 27), 27, $this->source);
        yield " >
        ";
        // line 28
        yield LS_Twig_Extension::processString($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "name", [], "any", false, false, true, 28), 28, $this->source), 1);
        yield "
    </div>

    <!-- Survey description -->
    <div class=\"";
        // line 32
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 32), "description", [], "any", false, false, true, 32), 32, $this->source);
        yield " form-heading\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 32), "description", [], "any", false, false, true, 32), 32, $this->source);
        yield ">
        ";
        // line 33
        yield LS_Twig_Extension::processString($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "description", [], "any", false, false, true, 33), 33, $this->source), 1);
        yield "
    </div>

    <!-- Welcome text -->
    <div class=\"";
        // line 37
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 37), "welcome", [], "any", false, false, true, 37), 37, $this->source);
        yield " form-heading\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 37), "welcome", [], "any", false, false, true, 37), 37, $this->source);
        yield ">
        ";
        // line 38
        yield LS_Twig_Extension::processString($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "welcome", [], "any", false, false, true, 38), 38, $this->source), 1);
        yield "
    </div>

    <!-- Question count -->
    <div class=\"";
        // line 42
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 42), "questioncount", [], "any", false, false, true, 42), 42, $this->source);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 42), "questioncount", [], "any", false, false, true, 42), 42, $this->source);
        yield ">
        <div class='";
        // line 43
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 43), "questioncounttext", [], "any", false, false, true, 43), 43, $this->source);
        yield "' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 43), "questioncounttext", [], "any", false, false, true, 43), 43, $this->source);
        yield ">
            ";
        // line 45
        yield "            ";
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "bShowxquestions", [], "any", false, false, true, 45) == true)) {
            // line 46
            yield "                ";
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "iTotalquestions", [], "any", false, false, true, 46) < 1)) {
                // line 47
                yield "                    ";
                yield gT("There are no questions in this survey.");
                yield "
                ";
            } elseif ((CoreExtension::getAttribute($this->env, $this->source,             // line 48
($context["aSurveyInfo"] ?? null), "iTotalquestions", [], "any", false, false, true, 48) == 1)) {
                // line 49
                yield "                    ";
                yield gT("There is 1 question in this survey.");
                yield "
                ";
            } else {
                // line 51
                yield "                    ";
                yield Twig\Extension\CoreExtension::sprintf(gT("There are %s questions in this survey."), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "iTotalquestions", [], "any", false, false, true, 51), 51, $this->source));
                yield "
                ";
            }
            // line 53
            yield "            ";
        }
        // line 54
        yield "        </div>
    </div>
</div>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/messages/welcome.twig";
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
        return array (  133 => 54,  130 => 53,  124 => 51,  118 => 49,  116 => 48,  111 => 47,  108 => 46,  105 => 45,  99 => 43,  93 => 42,  86 => 38,  80 => 37,  73 => 33,  67 => 32,  60 => 28,  54 => 27,  44 => 24,  40 => 22,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/messages/welcome.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/messages/welcome.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 45);
        static $filters = array("format" => 51);
        static $functions = array("processString" => 28, "gT" => 47);

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                ['format'],
                ['processString', 'gT'],
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
