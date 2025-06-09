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

/* ./subviews/content/submit.twig */
class __TwigTemplate_bc20c8d97c4b4608e508e292d773446c extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'endtext' => [$this, 'block_endtext'],
            'assessments' => [$this, 'block_assessments'],
            'printanswer' => [$this, 'block_printanswer'],
            'publicstatistics' => [$this, 'block_publicstatistics'],
            'endurl' => [$this, 'block_endurl'],
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 26
        yield "
";
        // line 28
        yield "<!-- main form -->
";
        // line 29
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/header/start_form.twig");
        yield "
    ";
        // line 31
        yield "    ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "EM", [], "any", false, false, true, 31), "ScriptsAndHiddenInputs", [], "any", false, false, true, 31), 31, $this->source);
        yield "
    <div class=\"";
        // line 32
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 32), "submitwrapper", [], "any", false, false, true, 32), 32, $this->source);
        yield "\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 32), "submitwrapper", [], "any", false, false, true, 32), 32, $this->source);
        yield ">
        <div class='";
        // line 33
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 33), "submitwrappertext", [], "any", false, false, true, 33), 33, $this->source);
        yield "' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 33), "submitwrappertext", [], "any", false, false, true, 33), 33, $this->source);
        yield ">
            ";
        // line 34
        yield from $this->unwrap()->yieldBlock('endtext', $context, $blocks);
        // line 42
        yield "
            ";
        // line 43
        yield from $this->unwrap()->yieldBlock('assessments', $context, $blocks);
        // line 49
        yield "
            ";
        // line 50
        yield from $this->unwrap()->yieldBlock('printanswer', $context, $blocks);
        // line 61
        yield "
            ";
        // line 62
        yield from $this->unwrap()->yieldBlock('publicstatistics', $context, $blocks);
        // line 73
        yield "
            ";
        // line 75
        yield "            ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 75), "sPluginHTML", [], "any", false, false, true, 75), 75, $this->source);
        yield "

            ";
        // line 77
        yield from $this->unwrap()->yieldBlock('endurl', $context, $blocks);
        // line 83
        yield "        </div>
    </div>
</form> <!-- main form -->
";
        return; yield '';
    }

    // line 34
    public function block_endtext($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 35
        yield "            ";
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 35), "showDefault", [], "any", false, false, true, 35) == true)) {
            // line 36
            yield "                <p class=\"";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 36), "submitwrappertextHeading", [], "any", false, false, true, 36), 36, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 36), "submitwrappertextpa", [], "any", false, false, true, 36), 36, $this->source);
            yield ">";
            yield gT("Thank you.");
            yield "</p>
                <p class=\"";
            // line 37
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 37), "submitwrappertextContent", [], "any", false, false, true, 37), 37, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 37), "submitwrappertextpb", [], "any", false, false, true, 37), 37, $this->source);
            yield ">";
            yield gT("Your survey responses have been recorded.");
            yield "</p>
            ";
        } else {
            // line 39
            yield "                ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 39), "sEndText", [], "any", false, false, true, 39), 39, $this->source);
            yield "
            ";
        }
        // line 41
        yield "            ";
        return; yield '';
    }

    // line 43
    public function block_assessments($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 44
        yield "            ";
        // line 45
        yield "            ";
        if (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aAssessments", [], "any", false, false, true, 45), "show", [], "any", false, false, true, 45)) {
            // line 46
            yield "                ";
            yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/messages/assessments.twig");
            yield "
            ";
        }
        // line 48
        yield "            ";
        return; yield '';
    }

    // line 50
    public function block_printanswer($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 51
        yield "            ";
        // line 52
        yield "            ";
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 52), "aPrintAnswers", [], "any", false, false, true, 52), "show", [], "any", false, false, true, 52) == true)) {
            // line 53
            yield "                <!--  Link to Print Answer Preview -->
                <div class=\"";
            // line 54
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 54), "submitwrapperdiva", [], "any", false, false, true, 54), 54, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 54), "submitwrapperdiv", [], "any", false, false, true, 54), 54, $this->source);
            yield ">
                    <a href=\"";
            // line 55
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 55), "aPrintAnswers", [], "any", false, false, true, 55), "sUrl", [], "any", false, false, true, 55), 55, $this->source);
            yield "\" title=";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 55), "aPrintAnswers", [], "any", false, false, true, 55), "sTitle", [], "any", false, false, true, 55), 55, $this->source);
            yield " class=\"";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 55), "submitwrapperdivaa", [], "any", false, false, true, 55), 55, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 55), "submitwrapperdivaa", [], "any", false, false, true, 55), 55, $this->source);
            yield ">
                        <span class=\"ri-printer-line\"></span> ";
            // line 56
            yield gT("Print your answers.");
            yield "
                    </a>
                </div>
            ";
        }
        // line 60
        yield "            ";
        return; yield '';
    }

    // line 62
    public function block_publicstatistics($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 63
        yield "            ";
        // line 64
        yield "            ";
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 64), "aPublicStatistics", [], "any", false, false, true, 64), "show", [], "any", false, false, true, 64) == true)) {
            // line 65
            yield "                <!-- Link to Public statistics -->
                <div class=\"";
            // line 66
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 66), "submitwrapperdivb", [], "any", false, false, true, 66), 66, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 66), "submitwrapperdivb", [], "any", false, false, true, 66), 66, $this->source);
            yield ">
                    <a href=\"";
            // line 67
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 67), "aPublicStatistics", [], "any", false, false, true, 67), "sUrl", [], "any", false, false, true, 67), 67, $this->source);
            yield "\" title=";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 67), "aPublicStatistics", [], "any", false, false, true, 67), "sTitle", [], "any", false, false, true, 67), 67, $this->source);
            yield " class=\"";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 67), "submitwrapperdivba", [], "any", false, false, true, 67), 67, $this->source);
            yield "\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 67), "submitwrapperdivba", [], "any", false, false, true, 67), 67, $this->source);
            yield ">
                        ";
            // line 68
            yield gT("View the statistics for this survey.");
            yield "
                    </a>
                </div>
            ";
        }
        // line 72
        yield "            ";
        return; yield '';
    }

    // line 77
    public function block_endurl($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 78
        yield "            ";
        // line 79
        yield "            ";
        if (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 79), "sSurveylsUrl", [], "any", false, false, true, 79)) {
            // line 80
            yield "                <a href=\"";
            yield str_replace("\"", "%22", $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 80), "sSurveylsUrl", [], "any", false, false, true, 80), 80, $this->source));
            yield "\">";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aCompleted", [], "any", false, false, true, 80), "sSurveylsUrlDescription", [], "any", false, false, true, 80), 80, $this->source);
            yield "</a>
            ";
        }
        // line 82
        yield "            ";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/content/submit.twig";
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
        return array (  261 => 82,  253 => 80,  250 => 79,  248 => 78,  244 => 77,  239 => 72,  232 => 68,  222 => 67,  216 => 66,  213 => 65,  210 => 64,  208 => 63,  204 => 62,  199 => 60,  192 => 56,  182 => 55,  176 => 54,  173 => 53,  170 => 52,  168 => 51,  164 => 50,  159 => 48,  153 => 46,  150 => 45,  148 => 44,  144 => 43,  139 => 41,  133 => 39,  124 => 37,  115 => 36,  112 => 35,  108 => 34,  100 => 83,  98 => 77,  92 => 75,  89 => 73,  87 => 62,  84 => 61,  82 => 50,  79 => 49,  77 => 43,  74 => 42,  72 => 34,  66 => 33,  60 => 32,  55 => 31,  51 => 29,  48 => 28,  45 => 26,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/content/submit.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/content/submit.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("block" => 34, "if" => 35);
        static $filters = array();
        static $functions = array("include" => 29, "gT" => 36, "str_replace" => 80);

        try {
            $this->sandbox->checkSecurity(
                ['block', 'if'],
                [],
                ['include', 'gT', 'str_replace'],
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
