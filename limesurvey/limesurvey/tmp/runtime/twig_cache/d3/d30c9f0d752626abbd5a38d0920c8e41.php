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

/* ./subviews/header/head.twig */
class __TwigTemplate_0d24be76345edd545953700e13aa8e96 extends Template
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
        // line 17
        yield "
";
        // line 18
        if (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "jYesNo", [], "any", false, false, true, 18)) {
            // line 19
            yield "    ";
            yield LS_Twig_Extension::registerScript("activateConfirmLanguage", (("\$.extend(LSvar.lang," . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "jYesNo", [], "any", false, false, true, 19), 19, $this->source)) . ")"), "POS_BEGIN");
            yield "
";
        }
        // line 21
        yield LS_Twig_Extension::registerScript("activateActionLink", "activateActionLink();", "POS_POSTSCRIPT");
        yield "

<head>
    <meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />
    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <meta name=\"generator\" content=\"LimeSurvey http://www.limesurvey.org\" />

    ";
        // line 29
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "metas", [], "any", false, false, true, 29), 29, $this->source);
        yield "

    <title>
        ";
        // line 32
        yield LS_Twig_Extension::processString($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "surveyls_title", [], "any", false, false, true, 32), 32, $this->source), 1);
        yield "
    </title>
    ";
        // line 34
        if (LS_Twig_Extension::imageSrc("./files/favicon.ico")) {
            // line 35
            yield "        <link rel=\"shortcut icon\" href=\"";
            yield LS_Twig_Extension::imageSrc("./files/favicon.ico");
            yield "\" />
    ";
        }
        // line 37
        yield "    <script type=\"text/javascript\">
        if(window.basicThemeScripts === undefined){ 
            window.basicThemeScripts = new ThemeScripts(); 
        } 
    </script>
    ";
        // line 43
        yield "    ";
        yield LS_Twig_Extension::registerScript("LSvarTemplateInit", "if(typeof LSvar === 'undefined') { var LSvar = {}; };", "POS_HEAD");
        yield "
    ";
        // line 44
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 44), "fixnumauto", [], "any", false, false, true, 44) && (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 44), "fixnumauto", [], "any", false, false, true, 44) != "off"))) {
            // line 45
            yield "        ";
            yield LS_Twig_Extension::registerScript("LSvarTemplateRealFixNumAuto", (("LSvar.bFixNumAuto = " . (((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 45), "fixnumauto", [], "any", false, false, true, 45) == "enable")) ? (1) : (0))) . ";"), "POS_HEAD");
            yield "
        ";
            // line 46
            yield LS_Twig_Extension::registerScript("LSvarTemplateRealNumRealValue", (("LSvar.bNumRealValue = " . (((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 46), "fixnumauto", [], "any", false, false, true, 46) == "disable")) ? (1) : (0))) . ";"), "POS_HEAD");
            yield "
    ";
        }
        // line 48
        yield "    ";
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/header/custom_header.twig");
        yield "

    ";
        // line 50
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/header/google_analytics.twig");
        yield "
</head>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/header/head.twig";
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
        return array (  111 => 50,  105 => 48,  100 => 46,  95 => 45,  93 => 44,  88 => 43,  81 => 37,  75 => 35,  73 => 34,  68 => 32,  62 => 29,  51 => 21,  45 => 19,  43 => 18,  40 => 17,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/header/head.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/header/head.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 18);
        static $filters = array();
        static $functions = array("registerScript" => 19, "processString" => 32, "imageSrc" => 34, "include" => 48);

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                [],
                ['registerScript', 'processString', 'imageSrc', 'include'],
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
