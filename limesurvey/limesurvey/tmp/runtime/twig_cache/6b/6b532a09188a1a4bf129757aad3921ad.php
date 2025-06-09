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

/* ./subviews/header/start_form.twig */
class __TwigTemplate_5d3b884e8700fc00a663465478012f03 extends Template
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
        // line 24
        yield "
";
        // line 30
        $context["htmlOptions"] = ["id" => "limesurvey", "name" => "limesurvey", "autocomplete" => "off", "class" => "survey-form-container form"];
        // line 37
        yield "
";
        // line 39
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "upload_file", [], "any", false, false, true, 39) == true)) {
            // line 40
            yield "    ";
            $context["htmlOptions"] = Twig\Extension\CoreExtension::merge($this->sandbox->ensureToStringAllowed(($context["htmlOptions"] ?? null), 40, $this->source), ["enctype" => "multipart/form-data"]);
        }
        // line 45
        yield "
<!-- Start of the main Form-->
";
        // line 47
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,         // line 48
($context["C"] ?? null), "Html", [], "any", false, false, true, 48), "form", [CoreExtension::getAttribute($this->env, $this->source,         // line 49
($context["aSurveyInfo"] ?? null), "surveyUrl", [], "any", false, false, true, 49), "post",         // line 51
($context["htmlOptions"] ?? null)], "method", false, false, true, 48), 48, $this->source);
        // line 53
        yield "

<!-- Ajax value -->
<!-- Needs to be set by javascript! Because if JavaScript is disabled, ajaxmode will completely fail! -->
";
        // line 57
        yield LS_Twig_Extension::registerScript("AJAXACTIVATE", "
    \$('#limesurvey').append('<input type=\"hidden\" name=\"ajax\" value=\"off\" id=\"ajax\" />');
    ", "POS_POSTSCRIPT");
        // line 61
        yield "


<!-- Field Names -->
<input type='hidden' name='fieldnames' value='";
        // line 65
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "hiddenfieldnames", [], "any", false, false, true, 65), 65, $this->source);
        yield "' id='fieldnames' />

";
        // line 68
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "hiddenInputs", [], "any", false, false, true, 68), 68, $this->source);
        yield "

<!-- Submit button -->
<button type=\"submit\" id=\"defaultbtn\" value=\"default\" name=\"move\" class=\"submit d-none\" style=\"display:none\">";
        // line 71
        yield gT("default");
        yield "</button>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/header/start_form.twig";
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
        return array (  90 => 71,  84 => 68,  79 => 65,  73 => 61,  69 => 57,  63 => 53,  61 => 51,  60 => 49,  59 => 48,  58 => 47,  54 => 45,  50 => 40,  48 => 39,  45 => 37,  43 => 30,  40 => 24,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/header/start_form.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/header/start_form.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 30, "if" => 39);
        static $filters = array("merge" => 40);
        static $functions = array("registerScript" => 58, "gT" => 71);

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['merge'],
                ['registerScript', 'gT'],
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
