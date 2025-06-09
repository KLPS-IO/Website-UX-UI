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

/* ./subviews/navigation/language_changer_first_page.twig */
class __TwigTemplate_98ed5cbf4891c89d1258db3e86d57792 extends Template
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
        // line 20
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "alanguageChanger", [], "any", false, false, true, 20), "show", [], "any", false, false, true, 20) == true)) {
            // line 21
            yield "    ";
            $context["htmlOptions"] = ["id" => "firstpage-changelang", "autocomplete" => "off", "class" => "form"];
            // line 26
            yield "
    <!-- Start of language change Form-->
    ";
            // line 28
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["C"] ?? null), "Html", [], "any", false, false, true, 28), "form", [CoreExtension::getAttribute($this->env, $this->source,             // line 29
($context["aSurveyInfo"] ?? null), "surveyUrl", [], "any", false, false, true, 29), "post",             // line 31
($context["htmlOptions"] ?? null)], "method", false, false, true, 28), 28, $this->source);
            // line 32
            yield "


    ";
            // line 35
            yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/language_changer.twig");
            yield "

    </form>
";
        }
        // line 39
        yield "

";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/navigation/language_changer_first_page.twig";
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
        return array (  65 => 39,  58 => 35,  53 => 32,  51 => 31,  50 => 29,  49 => 28,  45 => 26,  42 => 21,  40 => 20,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/navigation/language_changer_first_page.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/navigation/language_changer_first_page.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 20, "set" => 21);
        static $filters = array();
        static $functions = array("include" => 35);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
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
