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

/* ./subviews/content/register.twig */
class __TwigTemplate_724c4e348c0f4b7062dabc240343f99a extends Template
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
        // line 19
        yield "    <div class=\"";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 19), "register", [], "any", false, false, true, 19), 19, $this->source);
        yield " container\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 19), "register", [], "any", false, false, true, 19), 19, $this->source);
        yield ">
        ";
        // line 21
        yield "        ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "EM", [], "any", false, false, true, 21), "ScriptsAndHiddenInputs", [], "any", false, false, true, 21), 21, $this->source);
        yield "

        <div class=\"";
        // line 23
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 23), "registerrow", [], "any", false, false, true, 23), 23, $this->source);
        yield " row\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 23), "registerrow", [], "any", false, false, true, 23), 23, $this->source);
        yield ">
            <div class='";
        // line 24
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 24), "registerrowjumbotron", [], "any", false, false, true, 24), 24, $this->source);
        yield "' ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 24), "registerrowjumbotron", [], "any", false, false, true, 24), 24, $this->source);
        yield ">
                <div class=\"";
        // line 25
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 25), "registerrowjumbotrondiv", [], "any", false, false, true, 25), 25, $this->source);
        yield " clearfix\" ";
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 25), "registerrowjumbotrondiv", [], "any", false, false, true, 25), 25, $this->source);
        yield ">
                    ";
        // line 26
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/registration/register_head.twig");
        yield "
                    ";
        // line 27
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/registration/register_message.twig");
        yield "
                </div>
            </div>
        </div>
        ";
        // line 31
        yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/registration/register_error.twig");
        yield "

        ";
        // line 33
        $context["sViewContent"] = (("./subviews/registration/" . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "registration_view", [], "any", false, false, true, 33), 33, $this->source)) . ".twig");
        // line 34
        yield "        ";
        yield from         $this->loadTemplate(($context["sViewContent"] ?? null), "./subviews/content/register.twig", 34)->unwrap()->yield($context);
        // line 35
        yield "
    </div>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/content/register.twig";
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
        return array (  92 => 35,  89 => 34,  87 => 33,  82 => 31,  75 => 27,  71 => 26,  65 => 25,  59 => 24,  53 => 23,  47 => 21,  40 => 19,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/content/register.twig", "/Users/emmamendez/Source/KLPS/Website-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/content/register.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 33, "include" => 34);
        static $filters = array();
        static $functions = array("include" => 26);

        try {
            $this->sandbox->checkSecurity(
                ['set', 'include'],
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
